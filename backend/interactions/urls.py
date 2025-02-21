from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LikeViewSet, ShareViewSet, CommentViewSet, FollowViewSet

router = DefaultRouter()
router.register(r'likes', LikeViewSet, basename='like')
router.register(r'shares', ShareViewSet, basename='share')
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'follows', FollowViewSet, basename='follow')

urlpatterns = [
    path('', include(router.urls)),  # Include all interaction routes
]
