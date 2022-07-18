from django.urls import path,re_path
from . import views

app_name='accounts'

urlpatterns=[
    re_path(r'^$',views.SignUpView,name='signup'),
    re_path(r'^active/$',views.active_account,name='active'),
    re_path(r'^AlreadyExists$',views.account_already_exists,name='exists'),
    re_path(r'^CheckYourEmail$',views.check_your_email,name='check'),
    re_path(r'^Activated/$',views.activated,name='activated'),
]