import json
from django.shortcuts import render
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Recipe, Ingredient, Step, RecipeImage
from .permissions import IsChefOrReadOnly
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RecipeSerializer, IngredientSerializer, StepSerializer, RecipeImageSerializer, RecipeListSerializer, SharedRecipeListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.filters import OrderingFilter
from django.http import JsonResponse
from django.core.cache import cache
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django.db.models import Q, Case, When, Value, IntegerField, UUIDField, Count, Exists, OuterRef
from django.db import transaction
from interactions.models import Follow, Share, Like
from cook_list.models import CooklistItem

# Create your views here.
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsChefOrReadOnly]  

    def perform_create(self, serializer):
        serializer.save(chef=self.request.user)
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        user = instance.chef  

        self.perform_destroy(instance) 

        clear_feed_cache(user)

        return Response({"message": "Recipe deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class IngredientViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    permission_classes = [IsChefOrReadOnly]  

    def get_queryset(self):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        return Ingredient.objects.filter(recipe=recipe)

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        serializer.save(recipe=recipe)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            return self.bulk_create(request, *args, **kwargs)
        return super().create(request, *args, **kwargs)

    def bulk_create(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        ingredients_data = request.data

        for item in ingredients_data:
            item['recipe'] = recipe.id

        serializer = IngredientSerializer(data=ingredients_data, many=True)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = [IsChefOrReadOnly]

    def get_queryset(self):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        return Step.objects.filter(recipe=recipe)

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        serializer.save(recipe=recipe)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            return self.bulk_create(request, *args, **kwargs)
        return super().create(request, *args, **kwargs)

    def bulk_create(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        steps_data = request.data

        for item in steps_data:
            item['recipe'] = recipe.id

        serializer = StepSerializer(data=steps_data, many=True)

        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
class RecipeImageViewSet(viewsets.ModelViewSet):
    queryset = RecipeImage.objects.all()
    serializer_class = RecipeImageSerializer
    permission_classes = [IsChefOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        return RecipeImage.objects.filter(recipe=recipe)

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        serializer.save(recipe=recipe)

    def create(self, request, *args, **kwargs):
        if isinstance(request.data.getlist('image'), list):
            return self.bulk_create(request, *args, **kwargs)
        return super().create(request, *args, **kwargs)

    def bulk_create(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        images_data = request.FILES.getlist('image')

        if not images_data:
            return Response({"detail": "No images provided."}, status=status.HTTP_400_BAD_REQUEST)

        recipe_images = [RecipeImage(recipe=recipe, image=image) for image in images_data]


        RecipeImage.objects.bulk_create(recipe_images)
   

        return Response({"detail": f"{len(images_data)} images uploaded successfully."}, status=status.HTTP_201_CREATED)
        

from rest_framework.pagination import PageNumberPagination

class RecipePagination(PageNumberPagination):
    page_size = 15

class RecipeFeedView(ListAPIView):
    serializer_class = RecipeListSerializer
    pagination_class = RecipePagination
    permission_classes = [AllowAny]
    filter_backends = [OrderingFilter]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        user = self.request.user
        sort_order = self.request.query_params.get("sort", "newest")
        cache_key = f"recipe_feed_{user.userId if user.is_authenticated else 'anon'}_{sort_order}"
        
        queryset = cache.get(cache_key)

        if not queryset:
            queryset = Recipe.objects.annotate(
                likes_count=Count("like", distinct=True),
                shares_count=Count("share", distinct=True),
                comments_count=Count("comment", distinct=True),
            ).select_related("chef").prefetch_related("recipeimage_set")

            if user.is_authenticated:
                queryset = queryset.annotate(
                    is_liked=Exists(Like.objects.filter(recipe=OuterRef("pk"), user=user)),
                    is_shared=Exists(Share.objects.filter(recipe=OuterRef("pk"), user=user)),
                    is_plated=Exists(CooklistItem.objects.filter(cooklist__owner=user, recipe=OuterRef("pk"))),
                )

            queryset = queryset.order_by("-created_at" if sort_order == "newest" else "created_at")
            cache.set(cache_key, queryset, timeout=60)  
        return queryset

@api_view(["GET"])
def search_view(request):
    search = request.GET.get('search', '')

    results = Recipe.objects.filter(
        Q(title__icontains=search) | 
        Q(description__icontains=search) |
        Q(chef__username__icontains=search) |
        Q(ingredient__name__icontains=search) |
        Q(origin_country__icontains=search)
    ).distinct()

    paginator = RecipePagination()
    paginated_results = paginator.paginate_queryset(results, request)

    serializer = RecipeListSerializer(paginated_results, many=True)

    return paginator.get_paginated_response(serializer.data)


class FollowingFeedView(ListAPIView):
    serializer_class = SharedRecipeListSerializer 
    pagination_class = RecipePagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        following_users = Follow.objects.filter(user=user).values_list("followed_user", flat=True)

        shared_recipes = Share.objects.filter(user__in=following_users).select_related("recipe", "user")
        shared_recipe_map = {share.recipe.id: share.user for share in shared_recipes}
        shared_recipe_ids = shared_recipe_map.keys()
        queryset = Recipe.objects.filter(
            Q(chef__in=following_users) | Q(id__in=shared_recipe_ids)
        ).distinct().select_related("chef")
        self.shared_recipe_map = shared_recipe_map

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["shared_recipe_map"] = getattr(self, "shared_recipe_map", {})  
        return context
    
    
@api_view(['GET'])
def get_recipe_ids(request):
    recipe_ids = Recipe.objects.values_list('id', flat=True)
    return Response({"recipe_ids": list(recipe_ids)})

class UploadRecipeView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        with transaction.atomic():
            recipe_data = request.data.copy()

            try:
                # Parse ingredients and steps from JSON strings
                ingredients_data = json.loads(request.data.get("ingredients", "[]"))
                steps_data = json.loads(request.data.get("steps", "[]"))
            except json.JSONDecodeError:
                return Response({"error": "Invalid JSON format in ingredients or steps."}, status=status.HTTP_400_BAD_REQUEST)

            images_data = request.FILES.getlist("images")

            # Save recipe
            recipe_serializer = RecipeSerializer(data=recipe_data)
            if recipe_serializer.is_valid():
                recipe = recipe_serializer.save(chef=request.user)
            else:
                return Response(recipe_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Save ingredients
            if ingredients_data:
                for ingredient in ingredients_data:
                    ingredient["recipe"] = recipe.id  # Ensure recipe ID is set
                ingredient_serializer = IngredientSerializer(data=ingredients_data, many=True)
                if ingredient_serializer.is_valid():
                    ingredient_serializer.save()
                else:
                    transaction.set_rollback(True)
                    return Response(ingredient_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Save steps
            if steps_data:
                for step in steps_data:
                    step["recipe"] = recipe.id  # Ensure recipe ID is set
                step_serializer = StepSerializer(data=steps_data, many=True)
                if step_serializer.is_valid():
                    step_serializer.save()
                else:
                    transaction.set_rollback(True)
                    return Response(step_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Save images
            if images_data:
                recipe_images = [RecipeImage(recipe=recipe, image=image) for image in images_data]
                RecipeImage.objects.bulk_create(recipe_images)
                
            clear_feed_cache(request.user)  

            return Response({"message": "Recipe uploaded successfully!", "recipe_id": recipe.id}, status=status.HTTP_201_CREATED)
        
def clear_feed_cache(user):
        """Clears only the current user's recipe feed cache"""
        sort_orders = ["newest", "oldest"]  # Handle both sorting options

        user_id = str(user.userId) if user.is_authenticated else "anon"  # Handle anonymous users

        for sort in sort_orders:
            cache_key = f"recipe_feed_{user_id}_{sort}"
            cache.delete(cache_key)  # Delete only this user's cache
