from django.shortcuts import render

from django.views.generic import ListView
from product.models import Product

# Create your views here.

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
        