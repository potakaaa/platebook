from rest_framework.serializers import ModelSerializer
from .models import Like, Share, Comment, Follow

class LikeSerializer(ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
        extra_kwargs = {
            "user": {"read_only": True},
            "recipe": {"read_only": True},
        }
        
        
        
class ShareSerializer(ModelSerializer):
    class Meta:
        model = Share
        fields = "__all__"
        extra_kwargs = {
            "user": {"read_only": True},
            "recipe": {"read_only": True},
        }
        

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        

class FollowSerializer(ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"
        
