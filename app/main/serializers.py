from rest_framework import serializers
from .models import Post, Likes, Comment
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# class UserSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["id", "username", "password"]
#         extra_kwargs = {"password": {"write_only": True, "required": True}}


# def create(self, validated_data):
#     user = User.objects.create_user(**validated_data)
#     Token.objects.create(user=user)
#     return user


class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "content",
            "date",
            "author",
            "image",
            "likes_count",
            "comments_count",
        ]


class LikeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = "__all__"
