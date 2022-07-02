from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
from django.views.generic import CreateView
from . import forms
from django.utils.http import url_has_allowed_host_and_scheme
from . import models
# Create your views here.

class SignUpView(CreateView):
    form_class=forms.SignUpForm
    template_name='signup.html'
    success_url=reverse_lazy('login')
    
    def form_valid(self, form):
        user=form.save(commit=False)
        user.set_password(user.password)
        user.save()
        return super(SignUpView,self).form_valid(form)
    
def guest_login_form(request):
    form=forms.GuestForm(request.POST or None)
    context={
        'form': form,
    }
    if form.is_valid():
        next=request.GET.get('next_url')
        next_post=next=request.POST.get('next_url')
        redirect_path=next or next_post
        email=form.cleaned_data['email']
        new_guest_email=models.GuestEmail.objects.create(email=email)
        request.session['guest_email_id']=new_guest_email.id
        if url_has_allowed_host_and_scheme(redirect_path,request.get_host()):
            return redirect(redirect_path)
        else:
            return reverse('carts:checkout')
    return reverse('carts:checkout')

            
    
    
    