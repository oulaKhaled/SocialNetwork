from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Profile, Following, Followers, User, Social, FriendRequest
from .serializers import (
    ProfileSerializers,
    FollowersSerializers,
    FollowingSerializers,
    UserSerializers,
    SocialSerializers,
    FriendRequestSerializers,
)
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from main.models import Post, Likes
from main.serializers import PostSerializers, LikeSerializers


# Create your views here.
class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

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
        # print(" user id", user.id)
        # print("reciver : ", friend_request.reciver.id)
        if friend_request.reciver.id == user.id:
            try:
                friend_request.status = accept
                sender = friend_request.sender
                friend_request.save()
                response = {f"message:" "you accept {sender} request "}
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
    def get_friends_request(self, request):  # detail=False is for a set of objects
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


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class FollowersView(viewsets.ModelViewSet):
    queryset = Followers.objects.all()
    serializer_class = FollowersSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class FollowingView(viewsets.ModelViewSet):
    queryset = Following.objects.all()
    serializer_class = FollowingSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class SocialView(viewsets.ModelViewSet):
    queryset = Social.objects.all()
    serializer_class = SocialSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class FriendRequestView(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=["POST"])  # make sure of having pk
    def send_friend_request(self, request, pk=None):
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
