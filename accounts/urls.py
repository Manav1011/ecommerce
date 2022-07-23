from django.urls import path,re_path
from . import views

app_name='accounts'

urlpatterns=[
    re_path(r'^$',views.SignUpView,name='signup'),
    path('active/<str:username>',views.active_account,name='active'),
    re_path(r'^Activated/$',views.activated,name='activated'),
    re_path(r'^username_for_reset_password/$',views.username_for_reset_password,name='username_for_reset_password'),
    path('reset_password_page/<str:username>/<str:token>',views.reset_password_page,name='reset_password_page'),
    re_path(r'^reset_password/$',views.reset_password,name='reset_password'),
    re_path(r'^change_password/$',views.change_password,name='change_password'),
    
]