from django.contrib import admin
from .models import Post, Likes, Comment
from Profile.models import Profile, Followers, Following, User, Social, FriendRequest

admin.site.register(Post)
admin.site.register(Likes)
admin.site.register(Comment)
