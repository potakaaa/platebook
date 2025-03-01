from django.core.management.base import BaseCommand
from django_seed import Seed
from django.utils.crypto import get_random_string
from accounts.models import CustomUserModel
from recipes.models import Recipe, Ingredient, Step, RecipeImage
from interactions.models import Like, Share, Comment, Follow
from cook_list.models import Cooklist, CooklistItem
import random
from datetime import datetime
from django.utils.timezone import make_aware


class Command(BaseCommand):
    help = 'Seeds the database with dummy data using existing users'

    now = make_aware(datetime.now())

    def handle(self, *args, **kwargs):
        # Retrieve all existing users from the database
        users = CustomUserModel.objects.all()

        if not users:
            self.stdout.write(self.style.ERROR("No users found in the database."))
            return

        seeder = Seed.seeder()

        # Create some recipes

        recipe_count = 1
        seeder.add_entity(Recipe, 45, {
            'title': lambda x: f'Recipe {recipe_count}',
            'description': lambda x: f'This is a description for recipe {recipe_count}.',
            'origin_country': lambda x: random.choice(['Italy', 'India', 'Mexico', 'France']),
            'chef': lambda x: random.choice(users),  # Randomly assign a chef from existing users
        })
        recipe_count += 1 

        # Execute the seeding for recipes and retrieve their primary keys
        recipe_pks = seeder.execute()

        # Retrieve the created recipes using their primary keys
        recipes = Recipe.objects.filter(pk__in=recipe_pks[Recipe])

        # Add Ingredients and Steps for recipes
        for recipe in recipes:
            # Add Ingredients
            seeder.add_entity(Ingredient, 5, {
                'name': lambda x: f'Ingredient {random.random}',
                'quantity': lambda x: f'{random.randint(1, 10)} cups',
                'recipe': recipe,
            })

            # Add Steps
            step_counter = 1
            seeder.add_entity(Step, 3, {
                'step_num': lambda x: step_counter,
                'description': lambda x: f'Step {step_counter} of the recipe.',
                'recipe': recipe,
            })
            step_counter += 1  # Increment the step_counter after each step

            # Add RecipeImage (Using Cloudinary image URL)
            seeder.add_entity(RecipeImage, 1, {
                'recipe': recipe,
                'image': lambda x: 'https://res.cloudinary.com/demo/image/upload/v1592268959/sample.jpg',  # Provide a mock image URL
            })

        # Execute the seeding for ingredients, steps, and images
        seeder.execute()

        # Add Likes, Shares, Comments, and Follows for recipes
        for recipe in recipes:
            user = random.choice(users)  # Randomly pick a user from existing users

            # Add Likes
            seeder.add_entity(Like, 3, {
                'user': user,
                'recipe': recipe,
            })

            # Add Shares
            seeder.add_entity(Share, 3, {
                'user': user,
                'recipe': recipe,
            })

            # Add Comments
            comment_count = 1
            seeder.add_entity(Comment, 2, {
                'user': user,
                'recipe': recipe,
                'content': lambda x: f'Comment for recipe {comment_count}.'
            })
            comment_count += 1

            # Add Follows (Simulating users following each other)
            seeder.add_entity(Follow, 2, {
                'user': random.choice(users),
                'followed_user': user,
            })

        # Execute the seeding for likes, shares, comments, and follows
        seeder.execute()

        # Add Cooklist and CooklistItems
        seeder.add_entity(Cooklist, 3, {
            'owner': lambda x: random.choice(users),  # Randomly assign an owner from existing users
        })

        cooklist_pks = seeder.execute()

        # Retrieve cooklists using the primary keys
        cooklists = Cooklist.objects.filter(pk__in=cooklist_pks[Cooklist])

        for cooklist in cooklists:
            seeder.add_entity(CooklistItem, 5, {
                'cooklist': cooklist,
                'recipe': random.choice(recipes),
            })

        # Execute the seeding for cooklist items
        seeder.execute()

        self.stdout.write(self.style.SUCCESS(f"Seeding completed successfully!"))
