from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(
        'auth.User', on_delete=models.CASCADE, related_name='profile')
    description = models.TextField(blank=True, editable=True)
    image = models.ImageField(default='default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f"{self.user.username}'s profile"

    # creates a profile when a user is created
    @receiver(post_save, sender='auth.User')
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    # saves user's profile anytime user is saved
    @receiver(post_save, sender='auth.User')
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


class Post(models.Model):
    poster = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE)
    content = models.TextField(blank=False, editable=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(blank=True, null=True, editable=True)
    replies_to = models.ForeignKey(
        'self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')


class Like(models.Model):
    liker = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE)
    post = models.ForeignKey(
        'Post', on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"{self.liker.username} likes post {self.id}"


class Follow(models.Model):
    follower = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE, related_name='followed_users')
    followed = models.ForeignKey(
        'auth.User', on_delete=models.CASCADE, related_name='followers')

    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"
