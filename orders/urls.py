from django.urls import path,re_path
from . import views
app_name='orders'

urlpatterns=[
    re_path(r'^order_list/$',views.OrderObjects,name='order_list'),
    path('delete_order/<int:pk>',views.DeleteOrder,name='delete_order')
    ]