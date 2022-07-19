from operator import is_
from django.views.generic import TemplateView
from django.shortcuts import render
from django.core.mail import send_mail
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
    if contactForm.is_valid() and request.method == 'POST':
        form_data=contactForm.cleaned_data
        Username=request.POST.get('Username')
        Email=request.POST.get('Email')
        Content=request.POST.get('Content')
        try:
            subject=f'Response from {Username}'
            message=f'Email:{Email}\n{Content}'
            email_from ='manavshah1011.ms@gmail.com'
            recipirent_list=['ecommerce.django.manavshah@gmail.com',]
            print(send_mail(subject, message, email_from, recipirent_list,fail_silently=False))
            return JsonResponse({'success':True})
        except Exception as e:
            return JsonResponse({'success':False})
    else:
        contactForm=forms.ContactForm()
        return JsonResponse({'success':False})
