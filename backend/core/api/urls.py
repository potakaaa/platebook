"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts.views import CustomLoginView, CustomRegisterView, OTPPasswordRequestView, ResetPasswordView, VerifyOTP, GetUserByIDView, GetUserRecipesView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/registration/', CustomRegisterView.as_view(), name='custom_register'),
    path('auth/otp-request/', OTPPasswordRequestView.as_view()),
    path('auth/reset-password/', ResetPasswordView.as_view()),
    path('auth/verify-otp/', VerifyOTP.as_view()),
    path('social/login/', include('accounts.urls')),
    path('', include('recipes.urls')),
    path('', include('cook_list.urls')),
    path('', include('interactions.urls')),
    path('users/<uuid:userId>/', GetUserByIDView.as_view(), name='get_user_by_id'),
    path('users/<uuid:userId>/recipes/', GetUserRecipesView.as_view(), name='get_user_recipes_by_id'),
]
