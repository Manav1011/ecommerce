from asyncio import shield
from django.db import models
from carts.models import Cart
import random
import string
from addresses.models import Address
from billing.models import BillingProfile
from decimal import Decimal
from django.db.models.signals import pre_save, post_save,post_delete
from django.dispatch import receiver
import datetime

# Create your models here.

ORDER_STATUS_CHOICES = (
    ('created', 'Created'),
    ('paid', 'Paid'),
    ('shipped', 'Shipped'),
    ('refunded', 'Refunded')
)


class OrderManager(models.Manager):
    def new_or_get(self, billing_profile, cart_obj):
        created = False
        qs = self.get_queryset().filter(
            billing_profile=billing_profile, cart=cart_obj, active=True,status='created')
        if qs.exists():
            obj = qs.first()
        else:
            obj = self.model.objects.create(
                billing_profile=billing_profile, cart=cart_obj)
            created = False
        return obj, created

class Order_Log(models.Model):
    Billing_profile = models.ForeignKey(
        BillingProfile, on_delete=models.CASCADE, blank=True, null=True,related_name='billingprofile')
    Order_id = models.CharField(
        max_length=255, unique=True, blank=True, null=True)
    Shipping_address = models.ForeignKey(
        Address,related_name='shippingaddress',on_delete=models.CASCADE, null=True, blank=True)
    Billing_address = models.ForeignKey(
        Address,related_name='billingaddress', on_delete=models.CASCADE, null=True, blank=True)
    Cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    Status = models.CharField(
        max_length=255, default='created', choices=ORDER_STATUS_CHOICES)
    post_status=models.CharField(max_length=255, default='deleted')
    Shipping_total = models.DecimalField(
        max_digits=100, default=5.99, decimal_places=2)
    Order_total = models.DecimalField(
        max_digits=100, default=0.00, decimal_places=2)
    Active = models.BooleanField(default=True)
    Timestamp=models.DateTimeField(auto_now_add=True,blank=True,null=True)
    
    
    def __str__(self):
        return f'Deleted Order: {self.Order_id}'
    

class Order(models.Model):
    billing_profile = models.ForeignKey(
        BillingProfile, on_delete=models.CASCADE, blank=True, null=True)
    order_id = models.CharField(
        max_length=255, unique=True, blank=True, null=True)
    shipping_address = models.ForeignKey(
        Address,related_name='shipping_addresses',on_delete=models.CASCADE, null=True, blank=True)
    billing_address = models.ForeignKey(
        Address,related_name='billing_addresses', on_delete=models.CASCADE, null=True, blank=True)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=255, default='created', choices=ORDER_STATUS_CHOICES)
    shipping_total = models.DecimalField(
        max_digits=100, default=5.99, decimal_places=2)
    order_total = models.DecimalField(
        max_digits=100, default=0.00, decimal_places=2)
    active = models.BooleanField(default=True)
    timestamp=models.DateTimeField(auto_now_add=True,blank=True,null=True)

    def __str__(self):
        return self.order_id

    objects = OrderManager()

    def update_total(self):
        cart_total = self.cart.total
        shipping_total = self.shipping_total
        new_total = cart_total+Decimal(shipping_total)
        formated_total = format(new_total, '.2f')
        self.order_total = formated_total
        self.save()
        return new_total
    
    def check_done(self,request):
        billing_profile=self.billing_profile
        billing_address=request.session.get('billing_address_id')
        shipping_address=request.session.get('shipping_address_id')
        total=self.order_total 
        if billing_profile and billing_address and shipping_address and total>0:
            return True
        else:
            return False
        
    def mark_paid(self,request):
        if self.check_done(request):
            self.status='paid'
            self.save()
        return self.status
         

@receiver(post_delete,sender=Order)
def post_delete_order(instance,sender,*args,**kwargs):
    Order_Log.objects.create(
        Billing_profile=instance.billing_profile,
        Order_id=instance.order_id,
        Shipping_address=instance.shipping_address,
        Billing_address=instance.billing_address,
        Cart=instance.cart,
        Status=instance.status,
        Shipping_total=instance.shipping_total,
        Order_total=instance.order_total,
        Active=instance.active,
        Timestamp=instance.timestamp
    )
    print('Order Log Created')
    

def pre_save_order_id(sender, instance, *args, **kwargs):
    print("pre save order id")
    instance.order_id = ''.join(random.choice(
        string.ascii_letters+string.digits) for i in range(16))

    qs = Order.objects.filter(cart=instance.cart).exclude(
        billing_profile=instance.billing_profile)
    if qs.exists():
        qs.update(active=False)


pre_save.connect(pre_save_order_id, sender=Order)


def post_save_cart_total(sender, instance, created, *args, **kwargs):
    print("Post save cart total")
    cart_obj = instance
    qs = Order.objects.filter(cart_id=instance.id)
    if qs.count() == 1:
        order_obj = qs.first()
        order_obj.update_total()


post_save.connect(post_save_cart_total, sender=Cart)


def post_save_order(sender, instance, created, *args, **kwargs):
    if created:
        instance.update_total()


post_save.connect(post_save_order, sender=Order)
