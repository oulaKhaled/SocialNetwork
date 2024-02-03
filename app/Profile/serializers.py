from django.forms import ValidationError
from rest_framework.serializers import Serializer, ModelSerializer
from .models import Profile, Followers, Following, User, Social, FriendRequest
from rest_framework.decorators import action
from main.serializers import PostSerializers
from main.models import Post
from rest_framework.authtoken.models import Token
from rest_framework import serializers

from django.contrib.auth import get_user_model, authenticate


class ProfileSerializers(ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user",
            "username",
            "bio",
            "joined_date",
            "picture",
            "private",
            "get_followers_count",
            "get_following_count",
            "get_likes_count",
            "get_post_count",
        ]

    # def create(self, validated_data, kwargs):
    #     return Profile.objects.create(username=validated_data["username"], **kwargs)


class FollowersSerializers(ModelSerializer):
    class Meta:
        model = Followers
        fields = "__all__"


class FollowingSerializers(ModelSerializer):
    class Meta:
        model = Following
        fields = "__all__"


class UserSerializers(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # exclude the 'password' field from the serialization
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            username=validated_data["username"],
        )
        user.save()
        return user


class SocialSerializers(ModelSerializer):
    class Meta:
        model = Social
        fields = "__all__"


class FriendRequestSerializers(ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = "__all__"
