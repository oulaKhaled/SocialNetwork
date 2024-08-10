from django.urls import path, include

from rest_framework import routers
from .views import (
    ProfileView,
    FollowersView,
    FollowingView,
    UserView,
    FriendRequestView,
    UserRegister,
    SocialView,
)

router = routers.DefaultRouter()
router.register(
    "profile",
    ProfileView,
)
router.register("followers", FollowersView)
router.register("following", FollowingView)
router.register("user", UserView, basename="user")
router.register("Register", UserRegister, basename="register")
router.register("friendRequest", FriendRequestView)
router.register("social", SocialView)


urlpatterns = [
    path("", include(router.urls)),
]
