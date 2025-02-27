
# Create your views here.

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.views import LoginView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.conf import settings
import requests
from rest_framework import status
from django_otp.plugins.otp_email.models import EmailDevice
from cloudinary.uploader import upload
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import CustomUserModel
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class GoogleLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.CALLBACK_URL
    client_class = OAuth2Client
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            user = self.request.user
            
            refresh = RefreshToken.for_user(user)
            
            social_data = user.socialaccount_set.filter(provider="google").first()
            profile_picture_url = social_data.extra_data.get("picture") if social_data else None
            
            
            if profile_picture_url:
                uploaded_pfp_url = self.upload_image_from_url(profile_picture_url)
                if uploaded_pfp_url:
                    user.pfp = uploaded_pfp_url
                    user.save()
            
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            return Response({
                "access_token": access_token,
                "refresh_token": refresh_token,
                "user": {
                    "id": str(user.userId),
                    "email": user.email,
                    "username": user.username,
                }
            })
        return response
    
    def upload_image_from_url(self, image_url):
      try:
          response = requests.get(image_url)
          response.raise_for_status()
          

          upload_result = upload(
              response.content, 
              folder="profile_pictures",  
              resource_type="image"        
          )

          return upload_result["public_id"]

      except requests.exceptions.RequestException as e:
          print(f"Error fetching image from URL: {e}")
          return None
      except Exception as e:
          print(f"Cloudinary upload error: {e}")
          return None
    

    
class TwitterLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = TwitterOAuthAdapter
    callback_url = settings.CALLBACK_URL
    client_class = OAuth2Client
    



class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:  
            user = self.request.user 

            refresh = RefreshToken.for_user(user) 

            response.data["access"] = str(refresh.access_token)
            response.data["refresh"] = str(refresh)
            response.data["user"] = {
                "id": user.pk,
                "email": user.email,
                "username": user.username
            }
        
        return response 
    
    
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomUserModelSerializer, OTPSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomUserModelSerializer


class OTPPasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        try:
            serializer = OTPSerializer(data=request.data)
            if serializer.is_valid():

                email = serializer.validated_data['email']


                return Response({"message": "OTP sent to email."}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"error": f"Missing required field: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.utils import timezone 

class VerifyOTPAndResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        otp = request.data.get("otp")
        password1 = request.data.get("password1")
        password2 = request.data.get("password2")
        
        if not otp or not password1 or not password2:
            return Response({"error": "OTP, password1, and password2 are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        if password1 != password2:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_password(password1)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        device = EmailDevice.objects.filter(token=otp).first()
        
        
        if not device:
             return Response({"error": "Device not found or OTP is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        print(device)
        print(device.token)
        print(otp)

        # Ensure that the OTP is valid and not expired
        if not device.verify_token(otp):
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)


        user = device.user
        if not user:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        user.set_password(password1)
        user.save()

        return Response({"success": "Password reset successfully."}, status=status.HTTP_200_OK)
