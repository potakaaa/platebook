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
    
    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients', [])
        steps_data = validated_data.pop('steps', [])
        images_data = validated_data.pop('images', []) 
        
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        existing_ingredient_ids = []
        for ingredient_data in ingredients_data:
            ingredient_id = ingredient_data.get('id')
            if ingredient_id:
                ingredient = Ingredient.objects.get(id=ingredient_id, recipe=instance)
                for attr, value in ingredient_data.items():
                    setattr(ingredient, attr, value)
                ingredient.save()
                existing_ingredient_ids.append(ingredient_id)
            else:
                new_ingredient = Ingredient.objects.create(recipe=instance, **ingredient_data)
                existing_ingredient_ids.append(new_ingredient.id)

        Ingredient.objects.filter(recipe=instance).exclude(id__in=existing_ingredient_ids).delete()

        existing_step_ids = []
        for step_data in steps_data:
            step_id = step_data.get('id')
            if step_id:
                step = Step.objects.get(id=step_id, recipe=instance)
                for attr, value in step_data.items():
                    setattr(step, attr, value)
                step.save()
                existing_step_ids.append(step_id)
            else:
                new_step = Step.objects.create(recipe=instance, **step_data)
                existing_step_ids.append(new_step.id)

        Step.objects.filter(recipe=instance).exclude(id__in=existing_step_ids).delete()

        existing_image_ids = []
        for image_data in images_data:
            image_id = image_data.get('id', None)
            if image_id:
                try:
                    image = RecipeImage.objects.get(id=image_id, recipe=instance)
                    for attr, value in image_data.items():
                        setattr(image, attr, value)
                    image.save()
                    existing_image_ids.append(image_id)
                except RecipeImage.DoesNotExist:
                    pass  
            else:
                new_image = RecipeImage.objects.create(recipe=instance, **image_data)
                existing_image_ids.append(new_image.id)

        RecipeImage.objects.filter(recipe=instance).exclude(id__in=existing_image_ids).delete()

        return instance

    
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
