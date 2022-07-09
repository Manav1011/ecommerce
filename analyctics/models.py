from ipaddress import ip_address
from tabnanny import verbose
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model


# Create your models here.
User=get_user_model()

class ObjectViewed(models.Model):
    user=models.ForeignKey(User,blank=True,null=True,on_delete=models.CASCADE)
    ip_address=models.CharField(max_length=255,null=True,blank=True)
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveIntegerField()
    content_object=GenericForeignKey('content_type','object_id')
    timestamp=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return '%s viewed: %s'%(self.content_object,self.timestamp)
    
    class Meta:
        ordering=['-timestamp']
        verbose_name='Object viewed'
        verbose_name_plural ='Objects viewed'