# Generated by Django 4.0.5 on 2022-07-09 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_alter_tag_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='title',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
