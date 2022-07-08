from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from . import forms
from carts.views import is_ajax

class HomeView(TemplateView):
    template_name='home.html'
    
    def get_context_data(self, **kwargs):
        self.request.session['dark']=True
        context = super().get_context_data(**kwargs)
        return context
    
def dark_mode(request):
    dark=request.session.get('dark')
    dark=not dark
    request.session['dark']=dark
    return JsonResponse({'dark':dark})
    
def ContactView(request):
    contactForm=forms.ContactForm(request.POST or None)    
    if contactForm.is_valid():
        form_data=contactForm.cleaned_data
        print(list(form_data))
        if is_ajax(request):
            return JsonResponse({'form_data':form_data})
    return render(request,'contact/contact_page.html',context={'form':contactForm})