from rest_framework import serializers
from .models import Cooklist, CooklistItem
from recipes.serializers import RecipeSerializer
from accounts.serializers import CustomUserModelSerializer

class CooklistSerializer(serializers.ModelSerializer):
    owner = CustomUserModelSerializer(read_only=True)  
    cooklist_items = serializers.SerializerMethodField()  

    class Meta:
        model = Cooklist
        fields = ['id', 'owner', 'cooklist_name', 'created_at', 'updated_at', 'cooklist_items']

    def get_cooklist_items(self, obj):
        items = CooklistItem.objects.filter(cooklist=obj)
        return CooklistItemSerializer(items, many=True).data


class CooklistItemSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)  
    recipe_id = serializers.PrimaryKeyRelatedField(
        queryset=CooklistItem.objects.all(), source='recipe', write_only=True
    )  

    class Meta:
        model = CooklistItem
        fields = ['id', 'cooklist', 'recipe', 'recipe_id', 'created_at', 'updated_at']
