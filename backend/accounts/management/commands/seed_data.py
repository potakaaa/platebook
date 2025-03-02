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
    help = "Seeds the database with dummy data using existing users"

    now = make_aware(datetime.now())

    def handle(self, *args, **kwargs):
        users = list(CustomUserModel.objects.all())

        if not users:
            self.stdout.write(self.style.ERROR("No users found in the database."))
            return

        seeder = Seed.seeder()

        # Create unique recipe titles
        recipe_titles = [f"Recipe {i} - {get_random_string(5)}" for i in range(1, 46)]

    

        def get_recipe_title(x):
            return recipe_titles.pop() if recipe_titles else f"Recipe {get_random_string(5)}"

        seeder.add_entity(
            Recipe,
            len(recipe_titles),
            {
               "title": lambda x: recipe_titles.pop() if recipe_titles else f"Recipe {get_random_string(5)}",
                "description": lambda x: f"This is a description for {recipe_titles[-1] if recipe_titles else 'a recipe'}.",
                "origin_country": lambda x: random.choice(["Italy", "India", "Mexico", "France"]),
                "chef": lambda x: random.choice(users),
            },
        )


        # Execute the seeding for recipes and retrieve their primary keys
        recipe_pks = seeder.execute()
        recipes = list(Recipe.objects.filter(pk__in=recipe_pks[Recipe]))

        # Seed Ingredients, Steps, and RecipeImages for each recipe
        for recipe in recipes:
            # Ingredients
            seeder.add_entity(
                Ingredient,
                5,
                {
                    "name": lambda x: f"Ingredient {get_random_string(6)}",
                    "quantity": lambda x: f"{random.randint(1, 10)} cups",
                    "recipe": recipe,
                },
            )

            # Steps
            for step_num in range(1, 4):  # Generate step numbers
                seeder.add_entity(
                    Step,
                    1,
                    {
                        "step_num": step_num,
                        "description": f"Step {step_num} of {recipe.title}",
                        "recipe": recipe,
                    },
                )

            # Recipe Image
            seeder.add_entity(
                RecipeImage,
                1,
                {
                    "recipe": recipe,
                    "image": "https://res.cloudinary.com/dnxsmo7x0/image/upload/v1740411152/recipe_images/axdtrzis61hs1m7gjent.jpg",
                },
            )

        seeder.execute()

        # Add Likes, Shares, and Comments (Ensure unique likes)
        for recipe in recipes:
            liked_users = set()

            # Likes (Ensure unique users liking a post)
            for _ in range(3):
                user = random.choice(users)
                if user not in liked_users:  # Avoid duplicate likes
                    liked_users.add(user)
                    Like.objects.create(user=user, recipe=recipe)

            # Shares
            seeder.add_entity(
                Share,
                3,
                {
                    "user": lambda x: random.choice(users),
                    "recipe": recipe,
                },
            )

            # Comments (Unique comments)
            seeder.add_entity(
                Comment,
                2,
                {
                    "user": lambda x: random.choice(users),
                    "recipe": recipe,
                    "content": lambda x: f"Comment on {recipe.title} - {get_random_string(5)}",
                },
            )

            # Follows (Users following each other)
            seeder.add_entity(
                Follow,
                2,
                {
                    "user": lambda x: random.choice(users),
                    "followed_user": lambda x: random.choice(users),
                },
            )

        seeder.execute()



        cooklists = Cooklist.objects.all()

        for cooklist in cooklists:
            seeder.add_entity(
                CooklistItem,
                5,
                {
                    "cooklist": cooklist,
                    "recipe": lambda x: random.choice(recipes),
                },
            )

        seeder.execute()

        self.stdout.write(self.style.SUCCESS("Seeding completed successfully!"))
