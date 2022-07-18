from cgitb import html
from tkinter import S
from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
from django.views.generic import CreateView
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from . import forms
from django.utils.http import url_has_allowed_host_and_scheme
from . import models
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from django.contrib.auth import login,authenticate
from carts.views import is_ajax
from django.utils.html import strip_tags    
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.http import Http404
from django.contrib.auth.models import User
from django.template import Template



# Create your views here.

def LoginView(request):
    form = AuthenticationForm(request=request, data=request.POST)
    if form.is_valid():
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            print(user)
            login(request, user)
            print('logged in')
            if is_ajax(request):
                print('ajax request')
                return JsonResponse({'form':form.cleaned_data})
            return HttpResponseRedirect(reverse('home'))
        else:
            print('User not found')
    else:
            # If there were errors, we render the form with these
            # errors
        form= AuthenticationForm()
    return HttpResponseRedirect(reverse('home'))
    


def SignUpView(request):
    form=forms.SignUpForm(request.POST or None)
    SignUpView.username=request.POST.get('username')
    if form.is_valid():
        try:
            subject='Account Activation From eCommerce Website'
            html_message = render_to_string('account_activation.html',{'username':request.POST.get('username')})
            plain_message = strip_tags(html_message)
            email_from ='manavshah1011.ms@gmail.com'
            recipirent_list=[request.POST.get('email'),]
            print(send_mail(subject, plain_message, email_from, recipirent_list, html_message=html_message,fail_silently=False))
            form.save()
            return HttpResponseRedirect(reverse('accounts:check'))
        except Exception as e:
            print(e)
    else:
        return HttpResponseRedirect(reverse('accounts:exists'))

    
@csrf_exempt
def active_account(request):
    username=request.POST.get('username')
    user_obj=User.objects.get(username=username)
    if user_obj.is_active == False:
        user_obj.is_active=True
        user_obj.save()    
        return HttpResponseRedirect(reverse('accounts:activated'))
    else:        
        return HttpResponse(r'Your Account is already activated.')
    
    
def activated(request):
    return render(request,'activated.html')

def account_already_exists(request):
    return render(request,'account_already_exists.html')

def check_your_email(request):
    return render(request,'check_your_email.html')
    
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

            
    
    
    