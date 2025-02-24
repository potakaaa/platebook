from rest_framework.serializers import ModelSerializer
from dj_rest_auth.serializers import JWTSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUserModel
from django.db import IntegrityError
from rest_framework import serializers

class CustomUserModelSerializer(ModelSerializer): 

  class Meta:
    model = CustomUserModel
    fields = [
      "userId",
      "username",
      "email",
      "password", "pfp",
    ]
    extra_kwargs = {
            "password": {"write_only": True},
            "pfp": {"write_only": True}
        }
    
   
  def get_pfp_url(self, obj):
      return obj.pfp.url if obj.pfp else None


  def create(self, validated_data):
    
    if CustomUserModel.objects.filter(email=validated_data["email"]).exists():
      raise serializers.ValidationError({"email": ["This email is already in use."]})
    
    
    if CustomUserModel.objects.filter(username=validated_data["username"]).exists():
      raise serializers.ValidationError({"username": ["This username is already taken."]})
    
    try:
      user = CustomUserModel.objects.create_user(
        username=validated_data["username"],
        email=validated_data["email"],
        password=validated_data.get("password"),
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
      password = validated_data.pop("password", None)
      user = super().update(instance, validated_data)
      if password:
          user.set_password(password) 
          user.save()
      return user
    
    