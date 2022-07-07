from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from . import forms
from carts.views import is_ajax

class HomeView(TemplateView):
    template_name='home.html'
    
    def get_context_data(self, **kwargs):
        self.request.session['theme']='dark'
        context = super().get_context_data(**kwargs)
        context["default_theme"] = self.request.session.get('theme')
        context["state"] = 'checked'
        return context

def ContactView(request):
    contactForm=forms.ContactForm(request.POST or None)    
    if contactForm.is_valid():
        form_data=contactForm.cleaned_data
        print(list(form_data))
        if is_ajax(request):
            return JsonResponse({'form_data':form_data})
    return render(request,'contact/contact_page.html',context={'form':contactForm})