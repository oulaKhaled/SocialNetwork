from django.contrib import admin
from django.urls import path, include
import django.contrib.auth.urls
from rest_framework.authtoken.views import obtain_auth_token
import Profile

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("main.urls")),
    path("auth/", obtain_auth_token),
    path("profile/", include("Profile.urls")),
]
