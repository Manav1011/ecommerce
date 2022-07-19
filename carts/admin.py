from django.contrib import admin
from . models import Cart
from orders.models import Order
from django.contrib.auth.models import User
from billing.models import BillingProfile


# Register your models here.

# admin.site.register(Cart)
admin.site.register(Cart)
# admin.site.register(User)