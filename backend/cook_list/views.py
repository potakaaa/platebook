from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, serializers
from .models import Cooklist, CooklistItem
from .serializers import CooklistSerializer, CooklistItemSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from recipes.models import Recipe
from rest_framework.response import Response

class CooklistViewSet(viewsets.ModelViewSet):
    serializer_class = CooklistSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    http_method_names = ['get']
    
    def get_queryset(self):
        return Cooklist.objects.filter(owner=self.request.user)


class CooklistItemViewSet(viewsets.ModelViewSet):
    serializer_class = CooklistItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            CooklistItem.objects.filter(user=self.request.user)
            .order_by('-created_at')
            .distinct('recipe') 
        )

    def perform_create(self, serializer):
        cooklist, created = Cooklist.objects.get_or_create(owner=self.request.user
        )
        recipe = serializer.validated_data['recipe']

        if CooklistItem.objects.filter(cooklist=cooklist, recipe=recipe).exists():
            raise serializers.ValidationError("This recipe is already in your cooklist.")

        serializer.save(cooklist=cooklist)

    def destroy(self, request, *args, **kwargs):
        cooklist = Cooklist.objects.filter(owner=self.request.user).first()
        if not cooklist:
            raise serializers.ValidationError("You do not have a cooklist.")

        
        recipe_id = self.kwargs.get('pk')
        recipe = get_object_or_404(Recipe, id=recipe_id)

        cooklist_item = CooklistItem.objects.filter(cooklist=cooklist, recipe=recipe).first()

        if not cooklist_item:
            raise serializers.ValidationError("This recipe is not in your cooklist.")

        cooklist_item.delete()
        return Response({"message": "Recipe removed from your cooklist."}, status=204)
        
        
