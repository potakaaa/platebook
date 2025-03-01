from django.db import models
from accounts.models import CustomUserModel
from recipes.models import Recipe
from cloudinary.models import CloudinaryField

# Create your models here.
class Cooklist(models.Model):
    owner = models.OneToOneField(CustomUserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
         return f"{self.owner.username}'s Cooklist" 
    
class CooklistItem(models.Model):
    cooklist = models.ForeignKey(Cooklist, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.recipe.title