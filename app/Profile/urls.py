from django.urls import path, include

from rest_framework import routers
from .views import (
    ProfileView,
    FollowersView,
    FollowingView,
    UserView,
    FriendRequestView,
)

router = routers.DefaultRouter()
router.register("profile", ProfileView)
router.register("followers", FollowersView)
router.register("following", FollowingView)
router.register("user", UserView)
router.register("friendRequest", FriendRequestView)


urlpatterns = [
    path("", include(router.urls)),
]
