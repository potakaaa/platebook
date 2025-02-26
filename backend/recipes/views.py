from django.shortcuts import render
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Recipe, Ingredient, Step, RecipeImage
from .permissions import IsChefOrReadOnly
from rest_framework.permissions import AllowAny
from .serializers import RecipeSerializer, IngredientSerializer, StepSerializer, RecipeImageSerializer, RecipeListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.http import JsonResponse
from rest_framework.generics import ListAPIView

# Create your views here.
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsChefOrReadOnly]  

    def perform_create(self, serializer):
        serializer.save(chef=self.request.user)


class IngredientViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer
    permission_classes = [IsChefOrReadOnly]  
    
    def get_queryset(self):
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        return Ingredient.objects.filter(recipe=recipe)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        
        recipe = get_object_or_404(Recipe, pk=self.kwargs['recipe_pk'])
        serializer.save(recipe=recipe)
    
    
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
        

from rest_framework.pagination import PageNumberPagination

class RecipePagination(PageNumberPagination):
    page_size = 15

class RecipeFeedView(ListAPIView):
    queryset = Recipe.objects.all().order_by("-created_at")
    serializer_class = RecipeListSerializer
    pagination_class = RecipePagination
    permission_classes = [AllowAny]
    
    def dispatch(self, request, *args, **kwargs):
        print("HASHJDAJSDJH")
        print(f"Active permission classes: {self.permission_classes}")
        return super().dispatch(request, *args, **kwargs)  



