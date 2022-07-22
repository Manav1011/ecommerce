from django.forms import PasswordInput
import json
from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
from django.views.generic import CreateView
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from . import forms
from django.utils.http import url_has_allowed_host_and_scheme
from . import models
from django.contrib.auth.forms import AuthenticationForm,PasswordChangeForm
from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from django.contrib.auth import login,authenticate
from carts.views import is_ajax
from django.utils.html import strip_tags    
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
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
        form= AuthenticationForm()
    return HttpResponseRedirect(reverse('home'))
    


def SignUpView(request):
    form=forms.SignUpForm(request.POST or None)    
    if form.is_valid():
        try:
            subject='Account Activation From eCommerce Website'
            html_message = render_to_string('account_activation.html',{'domain':request.get_host(),'username':request.POST.get('username')})
            plain_message = strip_tags(html_message)
            email_from ='manavshah1011.ms@gmail.com'
            recipirent_list=[request.POST.get('email'),]
            print(send_mail(subject, plain_message, email_from, recipirent_list, html_message=html_message,fail_silently=False))
            form.save()
            return JsonResponse({'url':'accounts:check','type':'success'})
        except Exception as e:
            print(e)
            return HttpResponseRedirect(reverse('accounts:exists'))
    else:
        d=form.errors.as_data()
        errors=[]
        for i in d.values():
            for j in i:
                errors.append(str(j))
        return JsonResponse({'errors':errors,'type':'error'},safe=False)

    
def active_account(request,username):
    username=username
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


def username_for_reset_password(request):
    try:
        print(request.POST)
        username_for_reset_password.counter=0
        user_obj=User.objects.get(username=request.POST.get('username'))
        subject='Password Reset Link'
        html_message = render_to_string('reset_password_link.html',{'domain':request.get_host(),'username':request.POST.get('username')})
        plain_message = strip_tags(html_message)
        email_from ='manavshah1011.ms@gmail.com'
        recipirent_list=[user_obj.email,]
        print(send_mail(subject, plain_message, email_from, recipirent_list, html_message=html_message,fail_silently=False)) 
        return HttpResponse('Form has been submitted')
    except Exception as e:
        print(e)
        return HttpResponse('Form has not been submitted')
    
def reset_password_page(request,username):
    context={
        'username':username
    }
    return render(request, 'reset_password.html',context)


def reset_password(request):
    if request.method == 'POST':
        try:
            username_for_reset_password.counter+=1
            if username_for_reset_password.counter <= 1:
                username=request.POST.get('username')
                password=request.POST.get('password')
                print(password)
                user_obj=User.objects.get(username=username)
                user_obj.set_password(password)
                user_obj.save()
                return JsonResponse({'content':'Password has been changed','result':'success'})
            else:
                return JsonResponse({'content':'Password Reset link has been expired','result':'error'})
        except:
            print('An exception has occured')
            return JsonResponse({'content':'Password Reset link has been expired' ,'result':'error'})
    
    
def change_password(request):
    if request.method == 'POST':
        form=PasswordChangeForm(request.user,request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            return JsonResponse({'content':'Password has been changed'})
    else:
        form=PasswordChangeForm(request.user)
        
    
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

            
    
    
    