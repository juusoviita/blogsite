from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Post, Like, Follow


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'description', 'image']


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(many=False, read_only=True)
    followers = FollowSerializer(many=True, read_only=True)
    followed_users = FollowSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name',
                  'email', 'profile', 'followers', 'followed_users']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):

    likes = LikeSerializer(many=True, read_only=True)
    poster = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=True, allow_null=False)

    class Meta:
        model = Post
        fields = ['id', 'poster', 'content', 'timestamp',
                  'last_updated', 'replies_to', 'replies', 'likes']


class PostGetSerializer(serializers.ModelSerializer):

    likes = LikeSerializer(many=True, read_only=True)
    poster = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'poster', 'content', 'timestamp',
                  'last_updated', 'replies_to', 'replies', 'likes']
