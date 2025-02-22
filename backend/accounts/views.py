
# Create your views here.

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.views import LoginView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.conf import settings

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

    