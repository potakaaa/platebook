from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, serializers
from .models import Cooklist, CooklistItem
from .serializers import CooklistSerializer, CooklistItemSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class CooklistViewSet(viewsets.ModelViewSet):
    serializer_class = CooklistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        return Cooklist.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.owner != self.request.user:
            raise serializers.ValidationError("You can only modify your own cooklists.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.owner != self.request.user:
            raise serializers.ValidationError("You can only delete your own cooklists.")
        instance.delete()


class CooklistItemViewSet(viewsets.ModelViewSet):
    serializer_class = CooklistItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        cooklist = get_object_or_404(Cooklist, pk=self.kwargs['cooklist_pk'], owner=self.request.user)
        return CooklistItem.objects.filter(cooklist=cooklist)

    def perform_create(self, serializer):
        cooklist = get_object_or_404(Cooklist, pk=self.kwargs['cooklist_pk'], owner=self.request.user)
        recipe = serializer.validated_data['recipe']

        if CooklistItem.objects.filter(cooklist=cooklist, recipe=recipe).exists():
            raise serializers.ValidationError("This recipe is already in your cooklist.")

        serializer.save(cooklist=cooklist)

    def perform_destroy(self, instance):
        if instance.cooklist.owner != self.request.user:
            raise serializers.ValidationError("You can only remove items from your own cooklist.")
        instance.delete()
