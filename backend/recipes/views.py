from django.shortcuts import render
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Recipe, Ingredient, Step, RecipeImage
from .permissions import IsChefOrReadOnly
from rest_framework.permissions import AllowAny
from .serializers import RecipeSerializer, IngredientSerializer, StepSerializer, RecipeImageSerializer, RecipeListSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import OrderingFilter
from django.http import JsonResponse
from rest_framework.generics import ListAPIView
from django.db.models import Q
from interactions.models import Follow

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
        queryset = Recipe.objects.all()

        filter_type = self.request.query_params.get("filter", None)
        sort_order = self.request.query_params.get("sort", "newest")


        if filter_type == "following" and self.request.user.is_authenticated:
            following_users = Follow.objects.filter(user=self.request.user).values_list("followed_user", flat=True)
            queryset = queryset.filter(chef__id__in=following_users)

        if sort_order == "oldest":
            queryset = queryset.order_by("created_at")  
        else:
            queryset = queryset.order_by("-created_at")

        return queryset

def search_view(request):
    search =  request.GET.get('search', '')
    results = Recipe.objects.filter(
        Q(title__icontains=search) | 
        Q(description__icontains=search) |
        Q(chef__username__icontains=search) |
        Q(ingredient__name__icontains=search) |
        Q(origin_country__icontains=search) 
    ).distinct()

    serializer = RecipeListSerializer(results, many=True)

    return JsonResponse ({
        'search': search,
        'results': serializer.data
    })
