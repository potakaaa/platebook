from rest_framework import serializers
from .models import Cooklist, CooklistItem
from recipes.serializers import RecipeSerializer
from accounts.serializers import CustomUserModelSerializer
from recipes.models import Recipe

class CooklistSerializer(serializers.ModelSerializer):
    owner = CustomUserModelSerializer(read_only=True)  
    cooklist_items = serializers.SerializerMethodField()  
    cover_url = serializers.SerializerMethodField()

    class Meta:
        model = Cooklist
        fields = ['id', 'owner', 'cooklist_name', 'cooklist_desc', 'cooklist_cover','cover_url','created_at', 'updated_at', 'cooklist_items']
        extra_kwargs = {
            'cooklist_cover': {'write_only': True}
        }
        
        
    def get_cooklist_items(self, obj):
        items = CooklistItem.objects.filter(cooklist=obj)
        return CooklistItemSerializer(items, many=True).data
    
    def get_cover_url(self, obj):
        return obj.cooklist_cover.url if obj.cooklist_cover else None


class CooklistItemSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)  
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(), source='recipe', write_only=True
    )  

    class Meta:
        model = CooklistItem
        fields = ['id', 'recipe', 'recipe_id', 'created_at', 'updated_at']
