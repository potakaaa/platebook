from rest_framework.serializers import ModelSerializer
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
            "pfp": {"required": False}
        }

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
      
      if pfp_url and pfp_url.startswith("http"):
            cloudinary_image = self.upload_image_from_url(pfp_url)
            if cloudinary_image:
                user.pfp = cloudinary_image 
                user.save()
    
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
    


  def upload_image_from_url(self, image_url):
      try:
          # Fetch the image from the URL
          response = requests.get(image_url)
          response.raise_for_status()  # Raise an error for bad responses

          print("IMAGE URL", image_url)
          print("RESPONSE", response)
          
          # Upload the image to Cloudinary
          upload_result = cloudinary.uploader.upload(
              BytesIO(response.content),  # Use BytesIO to upload the image content
              folder="profile_pictures",   # Specify the folder in Cloudinary
              resource_type="image"        # Specify the resource type
          )

          return upload_result["secure_url"]  # Return the secure URL of the uploaded image

      except requests.exceptions.RequestException as e:
          print(f"Error fetching image from URL: {e}")
          return None
      except Exception as e:
          print(f"Cloudinary upload error: {e}")
          return None


    
    