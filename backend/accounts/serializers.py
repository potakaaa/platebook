from rest_framework.serializers import ModelSerializer, CharField, ValidationError
from .models import CustomUserModel
from django.db import IntegrityError
from rest_framework import serializers
from django_otp.plugins.otp_email.models import EmailDevice
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from cook_list.models import Cooklist
from interactions.models import Follow
from recipes.models import Recipe

class CustomUserModelSerializer(ModelSerializer): 

  password1 = CharField(write_only=True, required=False)
  password2 = CharField(write_only=True, required=False)
  followers_count = serializers.SerializerMethodField()
  following_count = serializers.SerializerMethodField()
  recipes_count = serializers.SerializerMethodField()
  pfp_url = serializers.SerializerMethodField()
  isFollowing = serializers.SerializerMethodField()

  class Meta:
    model = CustomUserModel
    fields = [
      "userId",
      "username",
      "email",
      "pfp",
      "pfp_url",
      "password1",
      "password2",
      "followers_count",
      "following_count",
      "recipes_count",
      "isFollowing",
    ]
    extra_kwargs = {
            "pfp": {"required": False, "write_only": True},
            "pfp_url": {"required": False, "read_only": True},
    }
    
  def get_pfp_url(self, obj):
      if hasattr(obj, "pfp") and obj.pfp:  
          return obj.pfp.url
      return None
  
  def get_followers_count(self, obj):
        return Follow.objects.filter(followed_user=obj).count() 

  def get_following_count(self, obj):
        return Follow.objects.filter(user=obj).count()  

  def get_recipes_count(self, obj):
        return Recipe.objects.filter(chef=obj).count()
      
  def get_isFollowing(self, obj):
        request = self.context.get("request")
        user = request.user
        if user.is_authenticated:
            return Follow.objects.filter(user=user, followed_user=obj).exists()
        return False
    
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
      
      Cooklist.objects.create(owner=user)
    
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

    pfp = validated_data.pop("pfp", None)
    if pfp:
        instance.pfp = pfp  

    new_username = validated_data.get("username", instance.username)
    if new_username != instance.username: 
        if CustomUserModel.objects.filter(username=new_username).exists():
            raise serializers.ValidationError({"username": ["This username is already taken."]})
        instance.username = new_username
    
    for attr, value in validated_data.items():
        setattr(instance, attr, value)

    if password:
        instance.set_password(password)  

    instance.save()  
    return instance

      
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
    

class OTPSerializer(serializers.Serializer):
   email = serializers.EmailField()

   def validate_email(self, value):
      try:
         user = CustomUserModel.objects.get(email=value)
      except CustomUserModel.DoesNotExist:
         raise serializers.ValidationError("Email Not Found")

      device, created = CustomEmailDevice.objects.get_or_create(user=user)
      otp = device.generate_challenge()

      device.valid_until = timezone.now() + timedelta(minutes=5) 
      device.save()

      return value
   

class CustomEmailDevice (EmailDevice):
   def generate_challenge(self, extra_context=None):
    try:
        self.generate_token()
        self.save()

        subject = "Your PlateBook Password Reset Code"
        
        context = {
            "username": self.user.username,
            "otp": self.token,
        }

        html_message = render_to_string("emails/otp-email.html", context)
        plain_message = strip_tags(html_message)

        sender_email = "platebook123@gmail.com"
        recipient_list = [self.user.email]

        email = EmailMultiAlternatives(subject, plain_message, sender_email, recipient_list)
        email.attach_alternative(html_message, "text/html")

        email.send()

        return "A reset code has been sent"

    except Exception as e:
        print(f"Error generating OTP email: {e}")
        raise serializers.ValidationError(f"An error occurred while sending the OTP: {str(e)}")


    
    