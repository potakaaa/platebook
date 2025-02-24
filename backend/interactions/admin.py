from django.contrib import admin
from .models import Like, Comment, Follow, Share
# Register your models here.

admin.site.register(Like)
admin.site.register(Comment)
admin.site.register(Follow)
admin.site.register(Share)
