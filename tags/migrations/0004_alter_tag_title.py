# Generated by Django 4.0.5 on 2022-07-09 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0003_alter_tag_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='title',
            field=models.CharField(max_length=255),
        ),
    ]
