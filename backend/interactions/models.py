from django.db import models
from accounts.models import CustomUserModel
from recipes.models import Recipe

# Create your models here.
class Like(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "recipe"], name="unique_like")
        ]

    def __str__(self):
        return self.user.email
    
class Share(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
    
    
class Comment(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
    
    
class Follow(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE, related_name="following")
    followed_user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email