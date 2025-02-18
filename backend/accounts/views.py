
# Create your views here.

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings

class GoogleLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.CALLBACK_URL
    client_class = OAuth2Client
    
class TwitterLogin(SocialLoginView):
    authentication_classes = []
    adapter_class = TwitterOAuthAdapter
    callback_url = settings.CALLBACK_URL
    client_class = OAuth2Client