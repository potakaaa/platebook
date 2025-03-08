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
        request = self.context['request']

        # Print the raw request data (for debugging)
        print("REQUEST DATA (raw):", request.data)  # Print raw data
        print("FILES:", request.FILES)  # Print files received

        # Check if 'ingredients' is already a list; no need to json.loads if it is
        ingredients_data = request.data.get("ingredients", [])
        if isinstance(ingredients_data, str):
            ingredients_data = json.loads(ingredients_data)
        print("Ingredients data:", ingredients_data)

        # Check if 'steps' is already a list; no need to json.loads if it is
        steps_data = request.data.get("steps", [])
        if isinstance(steps_data, str):
            steps_data = json.loads(steps_data)
        print("Steps data:", steps_data)

        # Get the image files sent in the 'images' field
        images_data = request.FILES.getlist("images")  # Access image files sent under the 'images' key
        print("Images data:", images_data)

        # Now you can access both the parsed JSON data and the uploaded image files
        for image_file in images_data:
            print(f"Processing image: {image_file.name}")
            # You can process the image here, e.g., saving it to the server or associating it with a recipe.

        # Temporarily skipping database update logic
        # Here you would update the instance with the received data

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
