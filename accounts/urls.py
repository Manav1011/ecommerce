from django.urls import path,re_path
from . import views

app_name='accounts'

urlpatterns=[
    re_path(r'^$',views.SignUpView.as_view(),name='signup'),
]