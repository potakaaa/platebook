from django.urls import path, include
from rest_framework_nested import routers
from .views import CooklistViewSet, CooklistItemViewSet

router = routers.DefaultRouter()
router.register(r'cooklists', CooklistViewSet, basename='cooklist')


router.register(r'cooklist-items', CooklistItemViewSet, basename='cooklist-items')

urlpatterns = [
    path('', include(router.urls)),       
    path("cooklist-items/<int:recipe_id>/", CooklistItemViewSet.as_view({'delete': 'destroy'}), name="cooklist-item-destroy"),
]
