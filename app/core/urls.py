from django.contrib import admin
from django.urls import path, include
import django.contrib.auth.urls
from rest_framework.authtoken.views import obtain_auth_token
import Profile
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from Profile.views import MyTokenObtainPairView

from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("main.urls")),
    # path("auth/", obtain_auth_token),
    path("profile/", include("Profile.urls")),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
