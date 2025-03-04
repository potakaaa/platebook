from django.urls import path, include
from rest_framework_nested import routers
from .views import RecipeViewSet, IngredientViewSet, StepViewSet, RecipeImageViewSet, RecipeFeedView, search_view
from interactions.views import LikeViewSet, ShareViewSet, CommentViewSet

router = routers.DefaultRouter()
router.register(r'recipes', RecipeViewSet, basename='recipe')

recipes_router = routers.NestedDefaultRouter(router, r'recipes', lookup='recipe')
recipes_router.register(r'ingredients', IngredientViewSet, basename='recipe-ingredients')
recipes_router.register(r'steps', StepViewSet, basename='recipe-steps')
recipes_router.register(r'images', RecipeImageViewSet, basename='recipe-images')
recipes_router.register(r'likes', LikeViewSet, basename='recipe-likes')
recipes_router.register(r'shares', ShareViewSet, basename='recipe-shares')
recipes_router.register(r'comments', CommentViewSet, basename='recipe-comments')
urlpatterns = [
    path('', include(router.urls)),
    path('', include(recipes_router.urls)),
    path('feed/', RecipeFeedView.as_view(), name='recipe-feed'),
    path('search/', search_view, name='search')
]
