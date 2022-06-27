from django.urls import re_path,path
from . views import cart_home,cart_update
app_name='carts'

urlpatterns=[
    re_path(r'^$',cart_home,name='cart_home'),
    re_path(r'^update/$',cart_update,name='update'),
    
]