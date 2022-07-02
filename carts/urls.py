from django.urls import re_path,path
from . views import cart_home,cart_update,checkout_home,checkout_done
app_name='carts'

urlpatterns=[
    re_path(r'^$',cart_home,name='cart_home'),
    re_path(r'^update/$',cart_update,name='update'),
    re_path(r'^checkout/$',checkout_home,name='checkout'),
    re_path(r'^checkout/success/$',checkout_done,name='success'),
]