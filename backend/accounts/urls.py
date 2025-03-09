from django.contrib import admin
from django.urls import path, include
from .views import GoogleLogin, DiscordOAuthLogin
from .views import GetUserByIDView

urlpatterns = [
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("discord/", DiscordOAuthLogin.as_view(), name="discord_login"),
]