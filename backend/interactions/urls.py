from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LikeViewSet, ShareViewSet, CommentViewSet, FollowViewSet, FollowingView, FollowersView, UserLikesView, UserSharesView
from recipes.urls import recipes_router


router = DefaultRouter()
recipes_router.register(r'likes', LikeViewSet, basename='like')
recipes_router.register(r'shares', ShareViewSet, basename='share')
recipes_router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'follows', FollowViewSet, basename='follow')

urlpatterns = [
    path('', include(router.urls)),  
    path('', include(recipes_router.urls)),
    path("users/<uuid:user_pk>/following/", FollowingView.as_view(), name="user-following"),
    path("users/<uuid:user_pk>/followers/", FollowersView.as_view(), name="user-followers"),
    path("users/<uuid:user_pk>/likes/", UserLikesView.as_view(), name="user-likes"),
    path("users/<uuid:user_pk>/shares/", UserSharesView.as_view(), name="user-shares"),
]

