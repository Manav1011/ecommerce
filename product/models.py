from django.db import models
import random
from django.db.models import Q
from django.db.models.signals import pre_save,post_save
from django.utils.text import slugify
import os
from django.urls import reverse
from tags.models import Tag
import re


PRODUCT_CATAGORIES=(
    ('wearable','Wearable'),
    ('digital','Digital')
)

def get_filename_ext(filepath):
    base_name=os.path.basename(filepath)
    name,ext=os.path.splitext(filepath)
    return name,ext

# Create your models here.
def upload_image_path(instance,filename):
    # print(instance)
    # print(filename)
    new_filename=random.randint(1,23233232323)
    name,ext=get_filename_ext(filename)
    final_filename=f'{new_filename}{ext}'
    return f'product/{new_filename}/{final_filename}'


class ProductQuerySet(models.query.QuerySet):
    def active(self):
        return self.filter(active=True)
    
    def featured(self):
        return self.filter(active=True,featured=True)
    
    def search(self,query):
        lookups=(Q(title__icontains=query) | 
                 Q(description__icontains=query) | 
                 Q(price__icontains=query) |
                 Q(tag__title__icontains=query)
                 )

        return self.filter(lookups).distinct()
        
    

class ProductManager(models.Manager):
    def get_queryset(self):
        return ProductQuerySet(self.model,using=self._db)
    
    def all(self):
        return self.get_queryset().active()
    
    def featured(self):
        return self.get_queryset().featured()
    
    def search(self,query):
        return self.get_queryset().active().search(query)
    
    
class Product(models.Model): 
    title=models.CharField(max_length=255)
    description=models.TextField()
    price=models.DecimalField(decimal_places=2
                              ,max_digits=10,default=39.99)
    image=models.ImageField(upload_to=upload_image_path,null=True,blank=True)
    slug=models.SlugField(blank=True,unique=True)
    featured=models.BooleanField(default=False)
    active=models.BooleanField(default=True)
    timestemp=models.DateTimeField(auto_now_add=True)
    catagories=models.CharField(max_length=255,default='wearable',choices=PRODUCT_CATAGORIES)
    objects=ProductManager()
    
    def get_absolute_url(self):
        return reverse("product:product_detail", kwargs={"slug": self.slug})
    
    
    def __str__(self):
        return self.title
    
def product_pre_save_reciever(sender,instance,*args,**kwargs):
    instance.slug=slugify(instance.title)

pre_save.connect(product_pre_save_reciever,sender=Product)

def post_save_reciever(sender,created,instance,*args,**kwargs):
    if created:
        def possible_tags(string):
            without_special_char=re.sub('[!@#$%^&*()-/\:]',"",string)
            if string in without_special_char:
                return 1
            else:
                return string,without_special_char
        if possible_tags(instance.title)==1:
            t=Tag.objects.create(title=instance.title)
            t.products.add(instance)
        else:
            for i in possible_tags(instance.title):
                print(instance)
                t=Tag.objects.create(title=i)
                t.products.add(instance)
            
        
post_save.connect(post_save_reciever,sender=Product)

def create_tags(string):
    without_special_char=re.sub('[!@#$%^&*()-/\:]',"",string)
    if string == without_special_char:
        return 1
    else:
        return string,without_special_char

def get_product(obj):
    if create_tags(obj.title)==1:
        t=Tag.objects.create(title=obj.title)
        t.products.add(obj)
    else:
        for i in create_tags(obj.title):            
            t=Tag.objects.create(title=i)
            t.products.add(obj)
    
    
    