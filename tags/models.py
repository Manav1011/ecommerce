from django.db import models
from django.utils.text import slugify
from product.models import Product
from django.db.models.signals import pre_save,post_save
# Create your models here.

class Tag(models.Model):
    title=models.CharField(max_length=255)
    slug=models.SlugField(blank=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    active=models.BooleanField(default=True)
    products=models.ManyToManyField(Product,blank=True)
    
    def __str__(self):
        return self.title
    def save(self,*args, **kwargs):
        self.slug=slugify(self.title)
        super().save(*args, **kwargs)

