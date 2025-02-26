from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, serializers
from .models import Like, Share, Comment, Follow
from recipes.models import Recipe
from .serializers import LikeSerializer, ShareSerializer, CommentSerializer, FollowSerializer

# Create your views here.
class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        recipe_id = self.kwargs["recipe_pk"]
        return Like.objects.filter(recipe_id=recipe_id, user=self.request.user).select_related("recipe")

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        like, created = Like.objects.get_or_create(user=self.request.user, recipe=recipe)

        if not created: 
            like.delete()
            raise serializers.ValidationError({"message": "Like removed."})

class ShareViewSet(viewsets.ModelViewSet):
    serializer_class = ShareSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        recipe_id = self.kwargs["recipe_pk"]
        return Share.objects.filter(recipe_id=recipe_id, user=self.request.user).select_related("recipe")

    def perform_create(self, serializer):
        recipe = get_object_or_404(Recipe, id=self.kwargs["recipe_pk"])
        serializer.save(user=self.request.user, recipe=recipe)



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