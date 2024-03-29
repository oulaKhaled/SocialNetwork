from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
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

# from django.contrib.auth.models import User

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from Profile.models import User


@permission_classes([IsAuthenticated])
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializers
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=["POST"])
    def add_like(self, request, pk=None):
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

    def create(self, request):
        data = request.data
        id = data["user_id"]
        user = User.objects.get(id=id)
        content = data["content"]
        like = data["like"]
        post_id = data["post"]
        post = Post.objects.get(id=post_id)
        new_comment = Comment.objects.create(
            user_id=id, post=post, like=like, content=content
        )
        if new_comment:
            serializer = CommentSerializers(new_comment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            message = {"message": "something went wrong"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializers

    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)
    @action(detail=True, methods=["GET"])
    def get_post_author(self, request, pk):
        user = User.objects.get(id=pk)
        posts = Post.objects.filter(author=user)
        if posts:
            serializer = PostSerializers(posts, many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            response = {"message": "there is no posts for this aurthor "}
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        print("User :", user, " POsts : ", posts)

    # def list(self, request, pk):
    #     post = Post.objects.filter(author=pk)
    #     print("custom list method is being called", post)
    #     if post:
    #         serializer = PostSerializers(post)
    #         print("custom list method is being called", serializer.data)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     else:
    #         return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
    #     return super().list(request, *args, **kwargs)

    @action(detail=True, methods=["GET"])
    def get_related_comments(self, request, pk):
        post = Post.objects.get(id=pk)
        print("post id :", post.id)
        comments = Comment.objects.filter(post=pk)
        if comments:
            serializer = CommentSerializers(comments, many=True)
            print("comment serilizer ", serializer.data)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            response = {"message": "no comments yet"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class LikeView(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikeSerializers

    def create(self, request):
        data = request.data
        post_id = data["post_id"]
        user_id = data["user_id"]
        post = Post.objects.get(id=post_id)
        user = User.objects.get(id=user_id)
        like = Likes.objects.create(post=post, user=user)
        if like:
            serializer = LikeSerializers(like)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "something went wrong"}, status=status.HTTP_400_BAD_REQUEST
            )
