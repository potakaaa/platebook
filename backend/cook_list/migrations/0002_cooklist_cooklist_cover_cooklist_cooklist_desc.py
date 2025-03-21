# Generated by Django 5.1.6 on 2025-02-24 15:38

import cloudinary.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cook_list', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cooklist',
            name='cooklist_cover',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='cover_images'),
        ),
        migrations.AddField(
            model_name='cooklist',
            name='cooklist_desc',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
