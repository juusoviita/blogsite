from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework import response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.serializers import Serializer

from datetime import date, datetime

from .models import Profile, Post, Like, Follow
from .serializers import UserSerializer, PostSerializer, LikeSerializer, FollowSerializer


# overview of all the API urls, remember to update!
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'All posts': '/post-list/',
        'Individual post': '/post-detail/<str:pk>',
        'All users': '/user-list/',
        'Individual user': '/user-detail/<str:pk>',
        'User\'s posts': '/user-posts/<str:poster_id>',
        'Posts of users being followed by the request maker': '/followed-posts/',
        'Posts liked by the request maker': '/liked-posts/',
        'Create a new post': '/create-post/',
        'Update an existing post': '/update-post/<str:pk>',
        'Delete a post': '/delete-post/<str:pk>',
        'Like a post': '/like-post/',
        'Unlike a post': '/unlike-post/<str:pk>',
        'Follow a user': '/follow-user/',
        'Unfollow a user': '/unfollow-user/<str:pk>',
        'Update an existing user': '/update-user/<str:pk>',
        'Delete a user': '/delete-user/<str:pk>',
    }

    return Response(api_urls)


# lists all the posts
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postList(request):
    posts = Post.objects.all().order_by('-timestamp')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


# get details of a specific post
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def postDetail(request, pk):
    post = Post.objects.get(pk=pk)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


# post, well, a post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPost(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# edit an existing post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updatePost(request, pk):
    post = Post.objects.get(pk=pk)
    request.data['last_updated'] = datetime.now()

    # only poster can edit
    if request.user.id == post.poster.id:
        serializer = PostSerializer(instance=post, data=request.data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    return Response(status=status.HTTP_401_UNAUTHORIZED)


# delete post if poster or superuser
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, pk):
    post = Post.objects.get(pk=pk)

    if request.user.id == post.poster.id or request.user.is_staff == True:
        post.delete()

        return Response('Post successfully deleted!')

    return Response(status=status.HTTP_401_UNAUTHORIZED)


# get specific user's posts
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userPosts(request, poster_id):
    posts = Post.objects.filter(poster=poster_id).order_by('-timestamp')
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# get all the posts the user likes
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def likedPosts(request):
    liked_posts = Like.objects.filter(
        liker=request.user).values_list('post', flat=True)
    print(liked_posts)
    posts = Post.objects.filter(id__in=liked_posts).order_by('-timestamp')
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# get posts from users the request maker follows
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followedPosts(request):
    followed_users = Follow.objects.filter(
        follower=request.user).values_list('followed', flat=True)
    posts = Post.objects.filter(
        poster__in=followed_users).order_by('-timestamp')
    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data)


# lists all the users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userList(request, format=None):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


# get individual user's details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userDetail(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


# delete own profile, or any profile if superuser
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    user = User.objects.get(pk=pk)

    if user == request.user or request.user.is_staff == True:
        user.delete()

        return Response('User successfully deleted!')

    return Response(status=status.HTTP_401_UNAUTHORIZED)


# update own profile via post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserSerializer(instance=user, data=request.data)

    if user == request.user and serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(status=status.HTTP_401_UNAUTHORIZED)


# like individual post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def likePost(request):
    serializer = LikeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# unlike individual post
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unlikePost(request, pk):
    like = Like.objects.get(pk=pk)
    like.delete()

    return Response('Post successfully unliked!')


# follow individual user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def followUser(request):
    serializer = FollowSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


# unfollow individual user
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfollowUser(request, pk):
    follow = Follow.objects.get(pk=pk)
    follow.delete()

    return Response('User successfully unfollowed!')
