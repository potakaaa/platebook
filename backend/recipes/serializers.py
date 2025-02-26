from rest_framework import serializers
from .models import Recipe, Ingredient, Step, RecipeImage
from accounts.models import CustomUserModel
from accounts.serializers import CustomUserModelSerializer
import cloudinary.uploader

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity']

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = ['id', 'step_num', 'description']

class RecipeImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = RecipeImage
        fields = ['id', 'image', 'image_url']
        extra_kwargs = {
            'image': {'write_only': True}
        }
        
    def get_image_url(self, obj):
        return obj.image.url if obj.image else None

class RecipeListSerializer(serializers.ModelSerializer):
    chef = serializers.SerializerMethodField() 
    images = RecipeImageSerializer(many=True, read_only=True, source='recipeimage_set')
    likes = serializers.SerializerMethodField()
    shares = serializers.SerializerMethodField()
    
    def get_likes(self, obj):
        return obj.like_set.count()
    
    
    def get_shares(self, obj):
        return obj.share_set.count()

    class Meta:
        model = Recipe
        fields = ["id", "title","description", "chef", "origin_country", "created_at", "images", "likes", "shares"]

    def get_chef(self, obj):
        return {
            "username": obj.chef.username,
            "pfp_url": getattr(obj.chef.pfp, 'url', None)
        }
        
    def get_pfp_url(self, obj):
        if hasattr(obj, "pfp") and obj.pfp:  
            return obj.pfp.url
        return None
        
    





class RecipeSerializer(serializers.ModelSerializer):
    chef = CustomUserModelSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True, source='ingredient_set')
    steps = StepSerializer(many=True, read_only=True, source='step_set')
    images = RecipeImageSerializer(many=True, read_only=True, source='recipeimage_set')
    likes = serializers.SerializerMethodField()
    shares = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'chef', 'origin_country', 'created_at', 'updated_at', 'ingredients', 'steps', 'images', 'likes', 'shares']
        extra_kwargs = {
            'likes': {'read_only': True},
            'shares': {'read_only': True}
        }


    def get_likes(self, obj):
        return obj.like_set.count()
    
    
    def get_shares(self, obj):
        return obj.share_set.count()