import re
from django.shortcuts import render,get_object_or_404
from django.urls import reverse,reverse_lazy
from django.http import HttpResponse
from django.views.generic import ListView,DetailView,CreateView,DeleteView
from product.models import Product
from carts.models import Cart
from . import forms
from django.contrib.auth.forms import  UserCreationForm


class ProductList(ListView):
    template_name='product/product_list.html'
    context_object_name='products'
    def get_queryset(self):
        queryset=Product.objects.all().order_by('-title')
        return queryset

class ProductDetail(DetailView):
    model=Product
    template_name='product/product_details.html'
    context_object_name='products'

    def get_context_data(self,*args,**kwargs):
        context=super().get_context_data(*args,**kwargs) 
        cart_obj,new_obj=Cart.objects.new_or_get(self.request)
        context['cart']=cart_obj
        return context
    

class SignUpView(CreateView):
    form_class=forms.SignUpForm
    template_name='signup.html'
    success_url=reverse_lazy('login')
    
    def form_valid(self, form):
        user=form.save(commit=False)
        user.set_password(user.password)
        user.save()
        return super(SignUpView,self).form_valid(form)
