from django.contrib import admin
from django.urls import path, include
from .views import GoogleLogin, TwitterLogin

urlpatterns = [
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path("twitter/", TwitterLogin.as_view(), name="twitter_login"),
]