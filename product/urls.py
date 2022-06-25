from django.urls import path,re_path
from . import views


app_name='product'

urlpatterns=[
    #path('<slug:slug>',views.display_info),
    re_path(r'^signup/$',views.SignUpView.as_view(),name='signup'),
    re_path('^products/$',views.ProductList.as_view(),name='products'),
    path('product/<slug:slug>',views.ProductDetail.as_view(),name='product_detail')
]