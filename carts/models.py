from django.db import models
from django.contrib.auth import get_user_model
from product.models import Product
from decimal import Decimal
from django.db.models.signals import pre_save,post_save,m2m_changed

# Create your models here.
User=get_user_model()

class CartManager(models.Manager):
    def new_or_get(self,request):
        cart_id=request.session.get('cart_id',None)
        qs=self.get_queryset().filter(id=cart_id)
        if qs.count() ==1:
            new_object=False
            cart_obj=qs.first()
            if request.user.is_authenticated and cart_obj.user is None:
                cart_obj.user=request.user
                cart_obj.save()
        else:
            cart_obj=self.new(user=request.user)
            new_object=True
            request.session['cart_id']=cart_obj.id
        return cart_obj,new_object
    
    def new(self,user=None):
        user_obj=None
        if user is not None:
            if user.is_authenticated:
                user_obj=user
        return self.model.objects.create(user=user_obj)

class Cart(models.Model):
    user=models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    products=models.ManyToManyField(Product,blank=True)
    subtotal=models.DecimalField(max_digits=100,default=0.00, decimal_places=2)
    total=models.DecimalField(max_digits=100,default=0.00, decimal_places=2)
    updated=models.DateTimeField(auto_now=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    
    objects=CartManager()
    
    def __str__(self):
        return str(self.id)
    

def m2m_changed_cart_reciever(sender,instance,action,*args,**kwargs):
    if action== 'post_add' or 'post_remove' or 'post_clear':
        products=instance.products.all()
        total=0
        for x in products:
            total+=x.price
        if instance.subtotal !=total:
            instance.subtotal=total
            instance.save()
m2m_changed.connect(m2m_changed_cart_reciever,sender=Cart.products.through)
        
def pre_save_cart_reciever(sender,instance,*args,**kwargs):
    if instance.subtotal >0:
        instance.total=instance.subtotal*Decimal(1.08 )
    else:
        instance.total=0.00

pre_save.connect(pre_save_cart_reciever,sender=Cart)
    
