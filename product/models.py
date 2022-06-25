from django.db import models
import random
from django.db.models.signals import pre_save,post_save
from django.utils.text import slugify
import os

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
    
class Product(models.Model): 
    title=models.CharField(max_length=255)
    description=models.TextField()
    price=models.DecimalField(decimal_places=2
                              ,max_digits=10,default=39.99)
    image=models.ImageField(upload_to=upload_image_path,null=True,blank=True)
    slug=models.SlugField(blank=True,unique=True)
    
    def __str__(self):
        return self.title
    
def product_pre_save_reciever(sender,instance,*args,**kwargs):
    instance.slug=slugify(instance.title)

pre_save.connect(product_pre_save_reciever,sender=Product)
    
    
    