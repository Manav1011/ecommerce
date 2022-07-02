from webbrowser import get
from django.db import models
from accounts.models import GuestEmail
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save

# Create your models here.
User=get_user_model()

class BillingProfileManager(models.Manager):
    def new_or_get(self,request):
        created=False
        obj=None
        user=request.user
        guest_email_id=request.session.get('guest_email_id')
        if user.is_authenticated:
            if user.email:
                obj,created=self.model.objects.get_or_create(user=user,email=user.email)
                
        elif guest_email_id is not None:
            guest_email_obj=GuestEmail.objects.get(id=guest_email_id)
            obj,created=self.model.objects.get_or_create(email=guest_email_obj.email)
        else:
            pass 
        return obj,created

class BillingProfile(models.Model):
    user=models.OneToOneField(User,null=True,blank=True,on_delete=models.CASCADE)
    email=models.EmailField()
    active=models.BooleanField(default=True)
    update=models.DateTimeField(auto_now=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    
    objects=BillingProfileManager()
    def __str__(self):
        return self.email
    
        
    
#A blilling profile will be created whenever a new user is created
def billing_profile_when_user_is_created(sender,instance,created,*args,**kwargs):
    if created and instance.email:
        BillingProfile.objects.get_or_create(user=instance,email=instance.email)
        
post_save.connect(billing_profile_when_user_is_created,sender=User)

