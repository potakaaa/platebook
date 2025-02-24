from django.db import models
from accounts.models import CustomUserModel
from recipes.models import Recipe
from cloudinary.models import CloudinaryField

# Create your models here.
class Cooklist(models.Model):
    owner = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    cooklist_name = models.CharField(max_length=255)
    cooklist_desc = models.TextField(max_length=500,blank=True, null=True)
    cooklist_cover = CloudinaryField('cover_images', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.cooklist_name
    
class CooklistItem(models.Model):
    cooklist = models.ForeignKey(Cooklist, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.recipe.title