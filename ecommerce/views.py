from operator import is_
from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from . import forms
from carts.views import is_ajax
import json

from accounts import forms as accountform
from django.contrib.auth import logout



dark_theme='dark'

    
class HomeView(TemplateView):
    template_name='base.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['dark']=self.request.session.get('dark')
        context['signup_form']=accountform.SignUpForm()
        return context
    
def dark_mode(request):
    global dark_theme
    if 'dark' in dark_theme:
        dark_theme='light'
    else:
        dark_theme='dark'
    return JsonResponse({'dark_theme':dark_theme})
    
def ContactView(request):
    contactForm=forms.ContactForm(request.POST or None)    
    if contactForm.is_valid():
        form_data=contactForm.cleaned_data
        print(form_data)
        if is_ajax(request):
            return JsonResponse({'form_data':form_data})
    return render(request,'contact/contact_page.html',context={'form':contactForm})