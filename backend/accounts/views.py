
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
from cloudinary.uploader import upload


class GoogleLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.CALLBACK_URL
    client_class = OAuth2Client
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            
            
            print(response.data)
            
            user = self.request.user
            
            refresh = RefreshToken.for_user(user)
            
            social_data = user.socialaccount_set.filter(provider="google").first()
            profile_picture_url = social_data.extra_data.get("picture") if social_data else None
            
            print(profile_picture_url)
            
            
            if profile_picture_url:
                uploaded_pfp_url = self.upload_image_from_url(profile_picture_url)
                if uploaded_pfp_url:
                    user.pfp = uploaded_pfp_url
                    user.save()
                    print("User profile picture updated successfully in Cloudinary.")
            
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

          print("IMAGE URL", image_url)
          print("RESPONSE", response)
          

          upload_result = upload(
              response.content, 
              folder="profile_pictures",  
              resource_type="image"        
          )

          return upload_result.get("secure_url") 

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
from .serializers import CustomUserModelSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomUserModelSerializer

    