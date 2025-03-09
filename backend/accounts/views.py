
# Create your views here.

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.views import LoginView
from django.http import JsonResponse, Http404
from django.shortcuts import get_object_or_404
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.conf import settings
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import status
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django_otp.plugins.otp_email.models import EmailDevice
from cloudinary.uploader import upload
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.generics import RetrieveAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from .models import CustomUserModel
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from recipes.models import Recipe
from recipes.serializers import RecipeSerializer
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomUserModelSerializer, OTPSerializer


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
                    "pfp_url": get_pfp_url(user)
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



class DiscordOAuthLogin(APIView):
    authentication_classes = []  

    def post(self, request):
        discord_id = request.data.get("discord_id")
        username = request.data.get("username")
        email = request.data.get("email")
        avatar = request.data.get("avatar")

        if not discord_id:
            return Response({"error": "Invalid Discord ID"}, status=400)

        user, created = CustomUserModel.objects.get_or_create(
            discord_id=discord_id,
            defaults={"username": username, "email": email}
        )

        if avatar:
            uploaded_pfp_url = self.upload_image_from_url(avatar)
            if uploaded_pfp_url:
                user.pfp = uploaded_pfp_url
                user.save()

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
                "pfp_url": self.get_pfp_url(user)
            }
        })

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

    

class UpdateUserView(RetrieveUpdateAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserModelSerializer
    lookup_field = "userId"
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser] 

    def get_object(self):
        user_id = self.kwargs.get("userId")
        user = self.get_queryset().filter(userId=user_id).first()

        if not user:
            raise Http404("User not found")

        if user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this profile.")

        return user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save(request=request)
            return Response(
                {"message": "User details updated successfully", "user": serializer.data},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.conf import settings

def get_pfp_url(obj):
    if hasattr(obj, "pfp") and obj.pfp:  
        cloudinary_url = f"https://res.cloudinary.com/{settings.CLOUDINARY_CLOUD_NAME}/image/upload/"
        return f"{cloudinary_url}{obj.pfp}"  
    return None




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
                "username": user.username,
                "pfp_url": get_pfp_url(user)
            }
        
        return response 
    
    


class CustomRegisterView(RegisterView):
    serializer_class = CustomUserModelSerializer


class OTPPasswordRequestView(APIView):
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


        if not device.verify_token(otp):
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)


        user = device.user
        if not user:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        user.set_password(password1)
        user.save()

        return Response({"success": "Password reset successfully."}, status=status.HTTP_200_OK)


class VerifyOTP(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        otp = request.data.get("otp")
        
        if not otp:
            return Response({"error": "OTP is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        device = EmailDevice.objects.filter(token=otp).first()
        
        if not device:
            return Response({"error": "Device not found or OTP is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not device.verify_token(otp):
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = device.user
        if not user:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        reset_token = PasswordResetTokenGenerator().make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.userId))

        response = JsonResponse({"success": "OTP verified successfully."})
        
        response.set_cookie(
            key="reset_token",
            value=reset_token,
            httponly=True,  
            max_age=600 , 
            secure=False,
            samesite="Lax",
            path="/"
        )

   
        response.set_cookie(
            key="uid",
            value=uid,
            httponly=True,
            max_age=600,
            secure=False,
            samesite="Lax",
            path="/"
        )

        return response
    
    


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reset_token = request.COOKIES.get("reset_token")
        uidb64 = request.COOKIES.get("uid")


        if not reset_token or not uidb64:
            return Response({"error": "Reset token is missing or invalid."}, status=status.HTTP_400_BAD_REQUEST)

        try:

            user_id = urlsafe_base64_decode(uidb64).decode()
            user = CustomUserModel.objects.get(userId=user_id)
        except (CustomUserModel.DoesNotExist, ValueError):
            return Response({"error": "Invalid token or user ID."}, status=status.HTTP_400_BAD_REQUEST)

        if not PasswordResetTokenGenerator().check_token(user, reset_token):
            return Response({"error": "Invalid or expired reset token."}, status=status.HTTP_400_BAD_REQUEST)

        password1 = request.data.get("password1")
        password2 = request.data.get("password2")

        if not password1 or not password2:
            return Response({"error": "Both password fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if password1 != password2:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:

            validate_password(password1)
        except ValidationError as e:
            print("VALIDATON ERROR")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password1)
        user.save()

        response = Response({"success": "Password reset successfully."}, status=status.HTTP_200_OK)
        response.delete_cookie("reset_token")
        response.delete_cookie("uid")

        return response

class GetUserByIDView(RetrieveAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserModelSerializer
    lookup_field = "userId"
    permission_classes = [AllowAny]
    
    def get_object(self):
        user_id = self.kwargs.get(self.lookup_field)
        print(user_id)
        
        user = self.get_queryset().filter(userId=user_id).first()
        
        if not user:
            raise Http404("User not found")
        
        return user
    
    
class UserRecipePagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 50  

class GetUserRecipesView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]
    pagination_class = UserRecipePagination 

    def get_queryset(self):
        user_id = self.kwargs.get("userId") 
        user = CustomUserModel.objects.filter(userId=user_id).first()
        
        if not user:
            raise Http404("User not found")
        
        return Recipe.objects.filter(chef=user)