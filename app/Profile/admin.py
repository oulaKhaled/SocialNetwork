from django.contrib import admin
from .models import Profile, Followers, Following, User, Social, FriendRequest

# Register your models here.
admin.site.register(Profile)
admin.site.register(Followers)
admin.site.register(Following)
admin.site.register(User)
admin.site.register(Social)
admin.site.register(FriendRequest)
