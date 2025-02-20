from django.urls import path, include
from rest_framework_nested import routers
from .views import RecipeViewSet, IngredientViewSet, StepViewSet, RecipeImageViewSet

router = routers.DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')

recipes_router = routers.NestedDefaultRouter(router, r'recipes', lookup='recipe')
recipes_router.register(r'ingredients', IngredientViewSet, basename='recipe-ingredients')
recipes_router.register(r'steps', StepViewSet, basename='recipe-steps')
recipes_router.register(r'images', RecipeImageViewSet, basename='recipe-images')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(recipes_router.urls)),
]
