from rest_framework.serializers import ModelSerializer
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