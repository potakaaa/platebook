from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from dj_rest_auth.serializers import JWTSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import cloudinary.uploader
from .models import CustomUserModel
from django.db import IntegrityError
from django.core.files.base import ContentFile
from rest_framework import serializers
import requests
import cloudinary.uploader
from io import BytesIO

class CustomUserModelSerializer(ModelSerializer): 

  password1 = CharField(write_only=True)
  password2 = CharField(write_only=True)

  class Meta:
    model = CustomUserModel
    fields = [
      "userId",
      "username",
      "email",
      "password1","password2", "pfp",
    ]
    extra_kwargs = {
            "pfp": {"required": False}
    }
    
  def validate(self, data):
    password1 = data.get("password1")
    password2 = data.get("password2")

    if password1 != password2:
        raise ValidationError({"password2": ["Passwords do not match."]})
        
    return data


  def create(self, validated_data):
    
    validated_data.pop("password2")  
    password = validated_data.pop("password1")
    
    if CustomUserModel.objects.filter(email=validated_data["email"]).exists():
      raise serializers.ValidationError({"email": ["This email is already in use."]})
    
    
    if CustomUserModel.objects.filter(username=validated_data["username"]).exists():
      raise serializers.ValidationError({"username": ["This username is already taken."]})
    
    try:
      user = CustomUserModel.objects.create_user(
        username=validated_data["username"],
        email=validated_data["email"],
        password=password,
      )
      
    
      return user
    
    except IntegrityError as e:
      error_message = str(e)
      if 'accounts_customusermodel_email_key' in error_message:
        raise serializers.ValidationError({"email": ["This email is already in use."]})

            
      if 'accounts_customusermodel_username_key' in error_message:
        raise serializers.ValidationError({"username": ["This username is already taken."]})

            
      raise serializers.ValidationError({"non_field_errors": ["An unexpected error occurred."]})
  

  def update(self, instance, validated_data):
        password = validated_data.pop("password1", None)
        validated_data.pop("password2", None)  

        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)  
            user.save()
        return user
      
  def save(self, request):
        user = CustomUserModel.objects.create_user(
            username=self.validated_data["username"],
            email=self.validated_data["email"],
            password=self.validated_data["password1"],
        )
        pfp = self.validated_data.get("pfp", None)
        if pfp:  
          user.pfp = pfp
        user.save()
        return user
    





    
    