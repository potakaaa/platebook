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
        return Share.objects.filter(recipe_id=recipe_id, user=self.request.user).select_related("recipe")

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        serializer.save(user=self.request.user, recipe=recipe)

class FollowViewSet(viewsets.ModelViewSet):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user).select_related("followed")

    def perform_create(self, serializer):
        followed_user = serializer.validated_data['followed']

        if followed_user == self.request.user:
            raise serializers.ValidationError("You cannot follow yourself.")

        follow, created = Follow.objects.get_or_create(follower=self.request.user, followed=followed_user)

        if not created: 
            follow.delete()
            raise serializers.ValidationError({"message": "Unfollowed user."})

        serializer.save(follower=self.request.user)
        
        

class FollowingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_pk):  
        user = get_object_or_404(CustomUserModel, pk=user_pk)  
        following = Follow.objects.filter(follower=user).select_related("followed")
        serializer = FollowSerializer(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FollowersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_pk):  
        user = get_object_or_404(CustomUserModel, pk=user_pk)  
        followers = Follow.objects.filter(followed=user).select_related("follower")
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
