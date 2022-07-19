"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,re_path,include
from product import  views
from django.views.generic import TemplateView
from django.contrib.auth.views import LoginView,LogoutView
from addresses.views import checkout_address_create_view,checkout_address_reuse_view
from accounts.views import guest_login_form
from accounts.views import LoginView as login_view
from . import views as ecommerceview
from carts.views import cart_detail_api_view
from search.views import getProducts

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('^$',ecommerceview.HomeView.as_view(),name='home'),
    re_path('^contact/$',ecommerceview.ContactView,name='contact'),
    re_path(r'^login/$',LoginView.as_view(template_name='login.html'),name='login'),
    re_path(r'^logout/$',LogoutView.as_view(),name='logout'),
    path('accounts/',include('accounts.urls')),
    path('orders/',include('orders.urls')),
    path('product/',include('product.urls')),
    re_path(r'^search/$',include('search.urls')),
    re_path(r'^api/cart/$',cart_detail_api_view,name='api_cart'),
    path('carts/',include('carts.urls')),
    re_path(r'^checkout/address/create/$',checkout_address_create_view,name='checkout_address_create'),
    re_path(r'^checkout/address/reuse/$',checkout_address_reuse_view,name='checkout_address_reuse'),
    re_path(r'^register/guest$',guest_login_form,name='guest_register'),
    re_path(r'^get_products/',getProducts,name='get_products'),
    re_path(r'^theme/$',ecommerceview.dark_mode,name='dark_mode'),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
