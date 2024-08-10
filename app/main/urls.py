from django.urls import path, include
from .views import PostView, CommentView, LikeView
from rest_framework import routers


router = routers.DefaultRouter()
router.register("post", PostView)
router.register("comment", CommentView)
router.register("like", LikeView)


urlpatterns = [
    path("", include(router.urls)),
]
