from collections.abc import Collection
from typing import Any
from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from django.contrib.auth.models import UserManager, BaseUserManager
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import (
    AbstractUser,
    UserManager,
    PermissionsMixin,
    BaseUserManager,
)
from django.conf import settings
from datetime import date

# Create your models here.


class PostManager(models.Manager):
    def create(self, content=None, image=None, **kwargs: Any):
        if content is None and image is None:
            raise ValidationError(" Post is Empty , please add something ")
        post = self.model(content=content, image=image, **kwargs)
        post.save(using=self._db)
        return post


class Post(models.Model):
    content = models.CharField(max_length=400, null=True, default=None)
    date = models.DateField(default=date.today)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    image = models.ImageField(blank=True, upload_to="images/", null=True, default=None)
    objects = PostManager()

    def likes_count(self):
        return Likes.objects.filter(post=self.id).count()

    def comments_count(self):
        return Comment.objects.filter(post=self.id).count()

    def __str__(self):
        return f"{self.content} - {self.author.username}"

    def author_username(self):
        return self.author.username


class Likes(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )

    def __str__(self):
        return self.post


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False
    )
    date = models.DateField(auto_now=True)
    like = models.IntegerField(
        blank=True,
        null=True,
        default=0,
    )
    content = models.CharField(max_length=300, null=False)

    def __str__(self):
        return self.content

    def get_username(self):
        return self.user.username
