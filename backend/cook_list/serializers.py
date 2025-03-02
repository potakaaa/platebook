from rest_framework import serializers
from .models import Cooklist, CooklistItem
from recipes.serializers import RecipeListSerializer
from accounts.serializers import CustomUserModelSerializer
from recipes.models import Recipe

class CooklistSerializer(serializers.ModelSerializer):
    owner = CustomUserModelSerializer(read_only=True)  
    cooklist_items = serializers.SerializerMethodField()  

    class Meta:
        model = Cooklist
        fields = ['id', 'owner','created_at', 'updated_at', 'cooklist_items']

        
    def get_cooklist_items(self, obj):
        items = CooklistItem.objects.filter(cooklist=obj)
        return CooklistItemSerializer(items, many=True, context=self.context).data


class CooklistItemSerializer(serializers.ModelSerializer):
    recipe = RecipeListSerializer(read_only=True)  
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=Recipe.objects.all(), source='recipe', write_only=True
    )  

    class Meta:
        model = CooklistItem
        fields = ['id', 'recipe', 'recipe_id', 'created_at', 'updated_at']
        
    def to_representation(self, instance):
        """Pass context dynamically to RecipeSerializer."""
        representation = super().to_representation(instance)
        representation['recipe'] = RecipeListSerializer(instance.recipe, context=self.context).data
        return representation
