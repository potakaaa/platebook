from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  FollowViewSet, FollowingView, FollowersView, UserLikesView, UserSharesView


router = DefaultRouter()

router.register(r'follows', FollowViewSet, basename='follows')

urlpatterns = [
    path('', include(router.urls)),  
    path("users/<uuid:user_pk>/following/", FollowingView.as_view(), name="user-following"),
    path("users/<uuid:user_pk>/followers/", FollowersView.as_view(), name="user-followers"),
    path("users/<uuid:user_pk>/likes/", UserLikesView.as_view(), name="user-likes"),
    path("users/<uuid:user_pk>/shares/", UserSharesView.as_view(), name="user-shares"),
]

