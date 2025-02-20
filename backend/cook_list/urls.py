from django.urls import path, include
from rest_framework_nested import routers
from .views import CooklistViewSet, CooklistItemViewSet

router = routers.DefaultRouter()
router.register(r'cooklists', CooklistViewSet, basename='cooklist')


cooklist_router = routers.NestedDefaultRouter(router, r'cooklists', lookup='cooklist')
cooklist_router.register(r'items', CooklistItemViewSet, basename='cooklist-items')

urlpatterns = [
    path('api/', include(router.urls)),       
    path('api/', include(cooklist_router.urls))
]
