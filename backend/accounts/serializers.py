from rest_framework.serializers import ModelSerializer
from dj_rest_auth.serializers import JWTSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUserModel
from django.conf import settings

class CustomUserModelSerializer(ModelSerializer): 
  class Meta:
    model = CustomUserModel
    fields = [
      "userId",
      "username",
      "email",
      "password", "pfp", "pfp_url",
    ]
    extra_kwargs = {
            "password": {"write_only": True},
            "pfp": {"write_only": True}
        }
    
   
    def get_pfp_url(self, obj):
        return obj.pfp.url if obj.pfp else None


  def create(self, validated_data):
    user = CustomUserModel.objects.create_user(
      validated_data["username"],
      validated_data["email"],
      validated_data.get("password")
    )

    return user
  

  def update(self, instance, validated_data):
      password = validated_data.pop("password", None)
      user = super().update(instance, validated_data)
      if password:
          user.set_password(password) 
          user.save()
      return user
    
    
    
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class CustomLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=True)  # Ensure email is always required

    def validate(self, attrs):
        print("✅ CustomLoginSerializer.validate() is running!")  # Debugging

        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Must include 'email' and 'password'")

        # Authenticate user
        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        print("Generated Refresh Token:", str(refresh))  # Debugging
        
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.pk,
                "email": user.email,
                "username": user.username
            }
        }

    
class CustomJWTSerializer(JWTSerializer):
    def __init__(self, *args, **kwargs):
        print("🚀 CustomJWTSerializer has been initialized!")  # Debugging
        super().__init__(*args, **kwargs)
  
    def validate(self, attrs):
        print("✅ CustomJWTSerializer is being used!")  # 🔍 Debugging

        data = super().validate(attrs)

        if not self.user:
            raise ValueError("No user found for JWT authentication")

        refresh = RefreshToken.for_user(self.user)
        
        print("Generated Refresh Token:", str(refresh))  # 🔍 Debugging
        
        data["access"] = str(refresh.access_token)
        data["refresh"] = str(refresh)  # ✅ Ensure refresh token is included
        
        data["user"] = {
            "id": str(self.user.pk),
            "email": self.user.email,
            "username": self.user.username
        }
        return data

