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



class RecipeSerializer(serializers.ModelSerializer):
    chef = CustomUserModelSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True, source='ingredient_set')
    steps = StepSerializer(many=True, read_only=True, source='step_set')
    images = RecipeImageSerializer(many=True, read_only=True, source='recipeimage_set')

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'chef', 'origin_country', 'created_at', 'updated_at', 'ingredients', 'steps', 'images']
