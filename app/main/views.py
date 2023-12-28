from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post, Likes, Comment
from .serializers import (
    PostSerializers,
    CommentSerializers,
    LikeSerializers,
)
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=["POST"])
    def add_like(self, request, pk=None):
        # print(type(request.data["like"]))
        # the primary key by default is id , you can decide what primary key you want to send instead id
        try:
            if request.data["like"]:
                comment = Comment.objects.get(id=pk)
                if request.POST["like"] == "1":
                    comment.like = comment.like + 1
                    comment.save()
                    response = {"message": "you liked this post"}
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    response = {"message": "You can only send likes as 1"}
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except:
            response = {"message": " Something went worng"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=["GET"])
    def get_related_comments(self, request, pk):
        try:
            comments = Comment.objects.filter(post=pk)
            serializer = CommentSerializers(comments, many=True)
            post = Post.objects.get(id=pk)
            post_serializer = PostSerializers(post)
            if comments:
                response = {"post": post_serializer.data, "comments": serializer.data}
                return Response(response, status=status.HTTP_202_ACCEPTED)
            else:
                response = {"message": "no comments yet"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except:
            response = {"message": "Something goes wrong"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class LikeView(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikeSerializers
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
