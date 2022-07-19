from re import A
from django.contrib import admin
from .models import Order_Log,Order

# Register your models here.
admin.site.register(Order)
admin.site.register(Order_Log)
