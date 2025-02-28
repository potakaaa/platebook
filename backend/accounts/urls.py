from django.contrib import admin
from django.urls import path, include
from .views import GoogleLogin

urlpatterns = [
    path("google/", GoogleLogin.as_view(), name="google_login"),
]