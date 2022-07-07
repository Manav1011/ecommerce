from operator import is_
from django.shortcuts import render

from django.views.generic import ListView
from product.models import Product
from carts.views import is_ajax
from tags.models import Tag
from django.http import JsonResponse

# Create your views here.

def getProducts(request):
    tag_list = Tag.objects.all().values()
    product_list=Product.objects.all().values()
    return JsonResponse({'products':list(product_list),'tag':list(tag_list)})

class SearchProduct(ListView):
    template_name='search/view.html'
    context_object_name='products'
    def get_queryset(self):
        
        method_dict=self.request.GET
        query=method_dict.get('q',None)
        if query is not None:
            queryset=Product.objects.search(query)
            return queryset
        return Product.objects.featured()
        