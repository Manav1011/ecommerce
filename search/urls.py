from django.urls import re_path,path
from search.views import SearchProduct

app_name='search'

urlpatterns=[
    re_path(r'^$',SearchProduct.as_view(),name='query')
]