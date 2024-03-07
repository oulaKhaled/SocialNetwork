from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_simplejwt.tokens import Token
from .models import Profile, Following, Followers, User, Social, FriendRequest
from .serializers import (
    ProfileSerializers,
    FollowersSerializers,
    FollowingSerializers,
    UserSerializers,
    SocialSerializers,
    FriendRequestSerializers,
    # UserLoginSerializer,
    # TokenSerializers,
)
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from main.models import Post, Likes
from main.serializers import PostSerializers, LikeSerializers
from django.contrib.auth.backends import ModelBackend
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Create your views here.
@permission_classes([IsAuthenticated])
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk):
        user = User.objects.get(id=pk)
        profile = Profile.objects.filter(user=user)
        if profile:
            serializer = ProfileSerializers(profile, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": " Profile not found"}, status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=["GET"])
    def get_post(self, request, pk):
        try:
            posts = Post.objects.filter(author=pk)
            serializer = PostSerializers(posts, many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            response = {"message": "something went wrong"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["GET"])
    def get_likes(self, request, pk):
        try:
            likes = Likes.objects.filter(user=pk)
            serializer = LikeSerializers(likes, many=True)
            if likes:
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                response = {"message": " no likes yet"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except:
            response = {"message": "something went wrong"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["POST"])
    def private_account(self, request, pk):
        private = request.data["private"]

        # print(f" private: {private}")

        try:
            profile = Profile.objects.get(user=request.user)
            profile.private = private
            profile.save()
            response = {"message": "request accepted"}
            return Response(response, status=status.HTTP_200_OK)
        except:
            response = {"message": "something went wrong... Please try again"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["POST"])
    def accept_friend(self, request, pk):
        request_id = request.data["request"]
        accept = request.data["status"]
        user = request.user
        friend_request = FriendRequest.objects.get(id=request_id)
        if friend_request.reciver.id == user.id:
            try:
                friend_request.status = accept
                sender = friend_request.sender
                friend_request.save()
                response = {
                    f"message:" "you accept {sender} request ",
                }
                followers_obj = Followers.objects.create(user=user, followers=sender)
                following_obj = Following.objects.create(user=sender, following=user)

                return Response(response, status=status.HTTP_202_ACCEPTED)
            except:
                response = {"message": "something went wrong"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {
                "The data provided in your request is invalid. Please review and correct the input data."
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["GET"])
    def get_friends_request(self, request, detail=False):
        # detail=False is for a set of objects
        print("user  : ", request.user)
        print("self ", self)
        try:
            reciver = request.user
            friend_requests = FriendRequest.objects.filter(reciver=reciver.id)
            serializer = FriendRequestSerializers(friend_requests, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            response = {"message": "something went wrong"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers


class UserRegister(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def post(self, request):
        clear_data = request.data
        serializer = UserSerializers(data=clear_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(validated_data=clear_data)
            return Response(user, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class FollowersView(viewsets.ModelViewSet):

    queryset = Followers.objects.all()
    serializer_class = FollowersSerializers
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)


@permission_classes([IsAuthenticated])
class FollowingView(viewsets.ModelViewSet):
    queryset = Following.objects.all()
    serializer_class = FollowingSerializers

    def list(self, request):
        user = request.user
        following = Following.objects.filter(user=user)
        serializer = FollowingSerializers(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class SocialView(viewsets.ModelViewSet):
    queryset = Social.objects.all()
    serializer_class = SocialSerializers

    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    def list(self, request):
        user_id = request.GET.get("user_id")  # to access query parameters from the URL
        profile = Profile.objects.get(user=user_id)
        print("Profile :", profile)
        print()
        if profile:
            account = Social.objects.get(profile=profile)
            serializer = SocialSerializers(account)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"messagae": "there is no accounts"}, status=status.HTTP_200_OK
            )


@permission_classes([IsAuthenticated])
class FriendRequestView(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializers

    @action(detail=False, methods=["POST"])  # make sure of having pk
    def send_friend_request(self, request):

        # reciver = request.data.get("reciver")
        # print(f" sender {request.user}  reciver {reciver}")
        sender = request.user
        reciver_id = request.data["reciver"]
        if reciver_id:
            try:
                reciver = User.objects.get(id=reciver_id)
                friend_request = FriendRequest.objects.filter(
                    sender=sender, reciver=reciver
                )
                serializer_friend_request = FriendRequest(FriendRequest)
                if friend_request:
                    reponse = {"message": "you already sent to them friend request"}
                    return Response(reponse, status=status.HTTP_400_BAD_REQUEST)
                else:
                    response = {"you may want to create new request"}
                    new_request = FriendRequest.objects.create(
                        sender=sender, reciver=reciver
                    )
                    new_request.save()
                    response = {"message": "friend request successfully send"}
                    return Response(response, status=status.HTTP_200_OK)
            except:
                response = {"message": "something went wrong"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = {
                "The data provided in your request is invalid. Please review and correct the input data."
            }
            return Response(Response, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


##make an account post protected to other accounts if they are not following the account

# make sure that the send token is the token for the spesific user


# @api_view(["POST"])
# def register(self, request):
#     serializer = UserSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

# @action(detail=True, methods=["GET"])
# def Login(self, request, pk=None):
#     user = User.objects.get(id=pk)
#     token = Token.objects.get(user=user)
#     print(token)
