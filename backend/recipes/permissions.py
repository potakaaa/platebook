from rest_framework import permissions
from .models import Recipe

class IsChefOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        if isinstance(obj, Recipe):
            return obj.chef == request.user

        if hasattr(obj, 'recipe'):
            return obj.recipe.chef == request.user

        return False
