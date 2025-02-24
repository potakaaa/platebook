from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.shortcuts import get_object_or_404
from .models import Recipe, Ingredient, Step, RecipeImage
from .permissions import IsChefOrReadOnly
from .serializers import RecipeSerializer, IngredientSerializer, StepSerializer, RecipeImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser

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
        print("🚀 create() reached!")  # 🔥 DEBUG: Check if create() is called
        print("DEBUG: self.kwargs =", self.kwargs)  # 🔥 Print kwargs
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        print("CREATE CALLED")
        print("DEBUG: ", self.kwargs)   
        
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


