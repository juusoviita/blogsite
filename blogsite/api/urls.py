from django.urls import path
from . import views
from django.urls.conf import include

urlpatterns = [
    path('', views.apiOverview, name='api-overview'),
    path('post-list/', views.postList, name='post-list'),
    path('post-detail/<str:pk>', views.postDetail, name='post-detail'),
    path('get-replies/<str:pk>', views.getReplies, name='get-replies'),
    path('user-posts/<str:poster_id>', views.userPosts, name='user-posts'),
    path('followed-posts/', views.followedPosts, name='followed-posts'),
    path('liked-posts/', views.likedPosts, name='liked-posts'),
    path('create-post/', views.createPost, name='create-post'),
    path('update-post/<str:pk>', views.updatePost, name='update-post'),
    path('delete-post/<str:pk>', views.deletePost, name='delete-post'),
    path('like-post/', views.likePost, name='like-post'),
    path('unlike-post/', views.unlikePost, name='unlike-post'),
    path('follow-user/', views.followUser, name='follow-user'),
    path('unfollow-user/<str:pk>', views.unfollowUser, name='unfollow-user'),
    path('user-list/', views.userList, name='user-list'),
    path('user-detail/<str:pk>', views.userDetail, name='user-detail'),
    path('delete-user/<str:pk>', views.deleteUser, name='delete-user'),
    path('update-user/<str:pk>', views.updateUser, name='update-user'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/',
         include('dj_rest_auth.registration.urls')),
]
