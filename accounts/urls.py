from django.urls import path,re_path
from . import views

app_name='accounts'

urlpatterns=[
    re_path(r'^$',views.SignUpView,name='signup'),
    re_path(r'^active/$',views.active_account,name='active'),
    re_path(r'^AlreadyExists$',views.account_already_exists,name='exists'),
    re_path(r'^CheckYourEmail$',views.check_your_email,name='check'),
    re_path(r'^Activated/$',views.activated,name='activated'),
    re_path(r'^username_for_reset_password/$',views.username_for_reset_password,name='username_for_reset_password'),
    re_path(r'^reset_password/$',views.reset_password,name='reset_password'),
    re_path(r'^change_password/$',views.change_password,name='change_password'),
    
]