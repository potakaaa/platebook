import json
from rest_framework import serializers
from .models import Recipe, Ingredient, Step, RecipeImage
from accounts.models import CustomUserModel
from accounts.serializers import CustomUserModelSerializer
from cook_list.models import CooklistItem
from interactions.models import Follow, Share
import cloudinary.uploader

class IngredientSerializer(serializers.ModelSerializer):
    recipe = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=True)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity', 'recipe']

class StepSerializer(serializers.ModelSerializer):
    recipe = serializers.PrimaryKeyRelatedField(queryset=Recipe.objects.all(), required=True)
    class Meta:
        model = Step
        fields = ['id', 'step_num', 'description', 'recipe']

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
    comments = serializers.SerializerMethodField()
    isPlateListed = serializers.SerializerMethodField()
    isLiked = serializers.SerializerMethodField()
    isShared = serializers.SerializerMethodField()
    
   

    
    def get_likes(self, obj):
        return obj.like_set.count()
    
    
    def get_shares(self, obj):
        return obj.share_set.count()

    class Meta:
        model = Recipe
        fields = ["id", "title","description", "chef", "origin_country", "created_at", "images", "likes", "shares", "comments", "isPlateListed", "isLiked", "isShared"]

    def get_chef(self, obj):
        return {
            "id": obj.chef.userId,
            "username": obj.chef.username,
            "pfp_url": getattr(obj.chef.pfp, 'url', None)
        }
        
    def get_pfp_url(self, obj):
        if hasattr(obj, "pfp") and obj.pfp:  
            return obj.pfp.url
        return None
    
    def get_comments(self, obj):
        return obj.comment_set.count()
    
    def get_isPlateListed(self, obj):
        request = self.context.get('request')  

        if not request or not hasattr(request, "user") or request.user.is_anonymous:
            return False

        return CooklistItem.objects.filter(cooklist__owner=request.user, recipe=obj).exists()
    
    def get_isLiked(self, obj):
        request = self.context.get('request') 

        if not request or not hasattr(request, "user") or request.user.is_anonymous:
            return False 
        
        return obj.like_set.filter(user=request.user).exists()

    def get_isShared(self, obj):
        request = self.context.get('request') 

        if not request or not hasattr(request, "user") or request.user.is_anonymous:
            return False 
        
        return obj.share_set.filter(user=request.user).exists()

    
        
class SharedRecipeListSerializer(RecipeListSerializer):
    sharedBy = serializers.SerializerMethodField()
    
    
    class Meta(RecipeListSerializer.Meta):
        fields = RecipeListSerializer.Meta.fields + ["sharedBy"]
        
    def get_sharedBy(self, obj):
        shared_recipe_map = self.context.get("shared_recipe_map", {})

        shared_user = shared_recipe_map.get(obj.id)
        if shared_user:
            return shared_user.username  
        return None



class RecipeSerializer(serializers.ModelSerializer):
    chef = CustomUserModelSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True, source='ingredient_set')
    steps = StepSerializer(many=True, read_only=True, source='step_set')
    images = RecipeImageSerializer(many=True, read_only=True, source='recipeimage_set')
    likes = serializers.SerializerMethodField()
    shares = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    isPlateListed = serializers.SerializerMethodField()
    isLiked = serializers.SerializerMethodField()
    isShared = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'chef', 'origin_country', 'created_at', 'updated_at', 'ingredients', 'steps', 'images', 'likes', 'shares', 'comments', 'isPlateListed', 'isLiked', 'isShared']
        extra_kwargs = {
            'likes': {'read_only': True},
            'shares': {'read_only': True},
            'comments': {'read_only': True},
            'isPlateListed': {'read_only': True},
            'isLiked': {'read_only': True},
            'isShared': {'read_only': True}
        }

    def update(self, instance, validated_data):
        request = self.context["request"]

        existing_ingredient_ids = json.loads(request.data.get("existing_ingredients", "[]"))
        ingredients_data = json.loads(request.data.get("ingredients", "[]"))


        updated_ingredient_ids = set(existing_ingredient_ids)
        for ingredient_data in ingredients_data:
            if "id" in ingredient_data and ingredient_data["id"] in existing_ingredient_ids:
                ingredient = Ingredient.objects.get(id=ingredient_data["id"])
                ingredient.name = ingredient_data["name"]
                ingredient.quantity = ingredient_data["quantity"]
                ingredient.save()
            else:
                new_ingredient = Ingredient.objects.create(recipe=instance, **ingredient_data)
                updated_ingredient_ids.add(new_ingredient.id)

        Ingredient.objects.filter(recipe=instance).exclude(id__in=updated_ingredient_ids).delete()

        existing_step_ids = json.loads(request.data.get("existing_steps", "[]"))
        steps_data = json.loads(request.data.get("steps", "[]"))


        updated_step_ids = set(existing_step_ids)
        for step_data in steps_data:
            if "id" in step_data and step_data["id"] in existing_step_ids:

                step = Step.objects.get(id=step_data["id"])
                step.description = step_data["description"]
                step.step_num = step_data["step_num"]  
                step.save()
            else:
                new_step = Step.objects.create(recipe=instance, **step_data)
                updated_step_ids.add(new_step.id)

        Step.objects.filter(recipe=instance).exclude(id__in=updated_step_ids).delete()

        existing_image_ids = json.loads(request.data.get("existing_images", "[]"))
        uploaded_images = request.FILES.getlist("images")

        updated_image_ids = set(existing_image_ids)
        for image_file in uploaded_images:
            new_image = RecipeImage(recipe=instance)
            new_image.image = image_file
            new_image.save()
            updated_image_ids.add(new_image.id)

        RecipeImage.objects.filter(recipe=instance).exclude(id__in=updated_image_ids).delete()

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.origin_country = validated_data.get("origin_country", instance.origin_country)
        instance.save()

        return instance



    def get_likes(self, obj):
        return obj.like_set.count()
    
    
    def get_shares(self, obj):
        return obj.share_set.count()
    
    def get_comments(self, obj):
        return obj.comment_set.count()
    
    def get_isPlateListed(self, obj):
        user = self.context['request'].user

        if user.is_anonymous:
            return False
        
        return CooklistItem.objects.filter(cooklist__owner=user, recipe=obj).exists()
    
    def get_isLiked(self, obj):
        user = self.context['request'].user

        if user.is_anonymous:
            return False
        
        return obj.like_set.filter(user=user).exists()
    
    def get_isShared(self, obj):
        user = self.context['request'].user

        if user.is_anonymous:
            return False
        
        return obj.share_set.filter(user=user).exists()
