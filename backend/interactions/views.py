from django.shortcuts import render
from rest_framework import viewsets, permissions, serializers
from .models import Like, Share, Comment, Follow
from .serializers import LikeSerializer, ShareSerializer, CommentSerializer, FollowSerializer

# Create your views here.
class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Like.objects.filter(user=self.request.user).distinct()

    def perform_create(self, serializer):
        recipe = serializer.validated_data['recipe']
        existing_like = Like.objects.filter(user=self.request.user, recipe=recipe).exists()

        if existing_like:
            raise serializers.ValidationError("You have already liked this recipe.")
        
        serializer.save(user=self.request.user)

class ShareViewSet(viewsets.ModelViewSet):
    serializer_class = ShareSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Share.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FollowViewSet(viewsets.ModelViewSet):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Follow.objects.filter(follower=self.request.user).distinct()

    def perform_create(self, serializer):
        followed_user = serializer.validated_data['followed']

        if followed_user == self.request.user:
            raise serializers.ValidationError("You cannot follow yourself.")

        existing_follow = Follow.objects.filter(follower=self.request.user, followed=followed_user).exists()
        if existing_follow:
            raise serializers.ValidationError("You are already following this user.")

        serializer.save(follower=self.request.user)