from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, serializers
from rest_framework.exceptions import ValidationError, NotFound
from .models import Like, Share, Comment, Follow
from accounts.models import CustomUserModel
from rest_framework.response import Response
from rest_framework import status
from recipes.models import Recipe
from .serializers import LikeSerializer, ShareSerializer, CommentSerializer, FollowSerializer
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.core.cache import cache

# Create your views here.
class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    http_method_names = ['get', 'post', 'delete']

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        like = Like.objects.filter(user=self.request.user, recipe=recipe).first()

        if not like:
            raise NotFound({"message": "Like not found."})

        return like
    
    def get_queryset(self):
        recipe_id = self.kwargs["recipe_pk"]
        return Like.objects.filter(recipe_id=recipe_id, user=self.request.user).select_related("recipe")
    

    
    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])

        like, created = Like.objects.get_or_create(user=self.request.user, recipe=recipe)

        if not created:
            raise ValidationError({"message": "You already liked this recipe."})

    def destroy(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        like = Like.objects.filter(user=self.request.user, recipe=recipe).first()

        if like:
            like.delete()
            return Response({"message": "Like removed."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Like not found."}, status=status.HTTP_404_NOT_FOUND)
            
    

class ShareViewSet(viewsets.ModelViewSet):
    serializer_class = ShareSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def get_object(self):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        share = Share.objects.filter(user=self.request.user, recipe=recipe).first()

        if not share:
            raise NotFound({"message": "Share not found."})

        return share
    
    def get_queryset(self):
        recipe_id = self.kwargs["recipe_pk"]
        return Share.objects.filter(recipe_id=recipe_id, user=self.request.user).select_related("recipe")

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        share, created = Share.objects.get_or_create(user=self.request.user, recipe=recipe)

        if not created:
            raise ValidationError({"message": "You already shared this recipe."})

    def destroy(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        share = Share.objects.filter(user=self.request.user, recipe=recipe).first()

        if share:
            share.delete()
            return Response({"message": "Share removed."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "Share not found."}, status=status.HTTP_404_NOT_FOUND)




class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        recipe_id = self.kwargs["recipe_pk"]
        return Comment.objects.filter(recipe_id=recipe_id).select_related("recipe")

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        serializer.save(user=self.request.user, recipe=recipe)

class FollowViewSet(viewsets.ModelViewSet):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user).select_related("followed")

    @action(detail=False, methods=["post"], url_path="follow")
    def follow_user(self, request):
        followed_user = request.data.get("followed_user")

        if not followed_user:
            return Response({"error": "followed_user is required."}, status=status.HTTP_400_BAD_REQUEST)

        if followed_user == str(request.user.userId):
            return Response({"error": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        follow, created = Follow.objects.get_or_create(user=request.user, followed_user_id=followed_user)

        if created:
            return Response({"message": "User followed successfully."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "You are already following this user."}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["delete"], url_path="unfollow")
    def unfollow_user(self, request):
        followed_user = request.data.get("followed_user")

        if not followed_user:
            return Response({"error": "followed_user is required."}, status=status.HTTP_400_BAD_REQUEST)

        follow = Follow.objects.filter(user=request.user, followed_user_id=followed_user).first()

        if not follow:
            return Response({"error": "You are not following this user."}, status=status.HTTP_400_BAD_REQUEST)

        follow.delete()
        
        cache_key = f'following_feed_{request.user.userId}'
        cache.delete(cache_key)
        
        return Response({"message": "User unfollowed successfully."}, status=status.HTTP_200_OK)
        

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUserModel, Follow
from .serializers import FollowSerializer
from django.shortcuts import get_object_or_404

class FollowingView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, user_pk):  
        following = Follow.objects.filter(user__pk=user_pk).select_related("followed_user")
        
        serializer = FollowSerializer(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FollowersView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, user_pk):  
        user = get_object_or_404(CustomUserModel, pk=user_pk)  

        followers = Follow.objects.filter(followed_user=user).select_related("user")
        serializer = FollowSerializer(followers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
class UserLikesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_pk):  
        user = get_object_or_404(CustomUserModel, pk=user_pk)  
        likes = Like.objects.filter(user=user).select_related("recipe")
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class UserSharesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_pk):  
        user = get_object_or_404(CustomUserModel, pk=user_pk)  
        shares = Share.objects.filter(user=user).select_related("recipe")
        serializer = ShareSerializer(shares, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
