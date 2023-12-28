from typing import Any
from django.db import models
from django.contrib.auth.models import User
from main.models import Likes, Post
from datetime import date
from django.contrib.auth.models import (
    AbstractUser,
    PermissionsMixin,
    UserManager,
    BaseUserManager,
)
from django.core.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from django.utils import timezone
from django.conf import settings


class UserManager(BaseUserManager):
    """Manage Users"""

    def create_user(self, email, password=None, **extra_fields):
        """Create save and return new User"""
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractUser, PermissionsMixin):
    """Customize built-in User model, so it will require an email"""

    email = models.EmailField(null=False, blank=False, unique=True)
    name = models.CharField(null=False, blank=False, max_length=200)
    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Profile(models.Model):
    """a model which contain all the fields that is needed for user's profile or account, and it's not needed for authentication"""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    username = models.CharField(max_length=200, null=False, blank=False, default=None)
    bio = models.TextField(
        blank=True, null=True, max_length=400, default="no bio yet..."
    )
    joined_date = models.DateField(null=True, blank=True, default=date.today)
    picture = models.ImageField(upload_to="images/", blank=True, null=True)
    private = models.BooleanField(default=False)

    def get_followers_count(self):
        return Followers.objects.filter(user=self.user).count()

    def get_following_count(self):
        return Following.objects.filter(user=self.user).count()

    def __str__(self):
        return self.username

    def get_likes_count(self):
        return Likes.objects.filter(user=self.user).count()

    def get_post_count(self):
        return Post.objects.filter(author=self.user).count()

    def get_requests_count(self):
        return FriendRequest.objects.filter(reciver=self.user)


class Following(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        max_length=100,
        on_delete=models.CASCADE,
        related_name="user_following_set",
    )
    following = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="following_set",
    )

    def __str__(self):
        return f"{self.user} is following {self.following}"

    class Meta:
        unique_together = ["user", "following"]


class Followers(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        max_length=100,
        on_delete=models.CASCADE,
        related_name="user_followers_set",
    )
    followers = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="followers_set",
    )

    def __str__(self):
        return f"{self.followers.name} followes {self.user.name} "

    class Meta:
        unique_together = ["user", "followers"]


class Social(models.Model):
    profile = models.OneToOneField(
        Profile, null=False, blank=False, unique=True, on_delete=models.CASCADE
    )
    twitter = models.URLField(max_length=283, null=True, blank=True)
    instgram = models.URLField(max_length=283, null=True, blank=True)
    github = models.URLField(max_length=283, null=True, blank=True)
    linkedin = models.URLField(max_length=283, null=True, blank=True)
    facebook = models.URLField(max_length=283, null=True, blank=True)

    def __str__(self):
        return self.profile.user.name


STATUS_CHOICES = (("send", "send"), ("accepted", "accepted"))


class FriendRequest(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="sender_set",
    )
    reciver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="reciver_set",
    )
    status = models.CharField(
        null=False, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0]
    )
    created_at = models.DateField(null=False, blank=False, default=date.today)

    def __str__(self):
        return f"{self.sender.name} send request to {self.reciver.name}"

    class Meta:
        unique_together = ["reciver", "sender"]
