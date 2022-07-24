from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
from . import forms
from django.utils.http import url_has_allowed_host_and_scheme
from . import models
from django.contrib.auth.forms import AuthenticationForm,PasswordChangeForm
from django.http import HttpResponseRedirect,JsonResponse,HttpResponse
from django.contrib.auth import login,authenticate
from django.utils.html import strip_tags    
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash
from uuid import uuid4
import datetime

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
            return HttpResponseRedirect(reverse('home'))
        else:
            return JsonResponse({'errors':form.errors.as_json(),'type':'error'},safe=False)
    else:
        return JsonResponse({'errors':form.errors.as_json(),'type':'error'},safe=False)
    return HttpResponseRedirect(reverse('home'))
    


def SignUpView(request):
    SignUpView.form=forms.SignUpForm(request.POST or None)    
    if SignUpView.form.is_valid():
        try:
            SignUpView.rand_token = uuid4()
            print(SignUpView.rand_token)
            str_token=str(SignUpView.rand_token)
            subject='Account Activation From eCommerce Website'
            html_message = render_to_string('account_activation.html',{'domain':request.get_host(),'username':request.POST.get('username'),'token':str_token})
            plain_message = strip_tags(html_message)
            email_from ='manavshah1011.ms@gmail.com'
            send_mail(subject, plain_message, email_from, [request.POST.get('email'),], html_message=html_message,fail_silently=False)
            SignUpView.current_time=datetime.datetime.now()
            print(SignUpView.current_time)
            return JsonResponse({'url':'accounts:check','type':'success'})
        except Exception as e:
            print(e)
            error=str(e)
            print('Exception Occured')
            return JsonResponse({'Exception':'occured','content':error})
    else:
        return JsonResponse({'errors':SignUpView.form.errors.as_json(),'type':'error'},safe=False)

    
def active_account(request,username,token):
    token=token
    print(token)
    username=username
    responsetime=datetime.datetime.now()
    try:
        timedelta=responsetime-SignUpView.current_time
        print(timedelta.total_seconds()/60)
        print(SignUpView.rand_token)
        if token==str(SignUpView.rand_token) and timedelta.total_seconds()/60 <=5:
            SignUpView.form.save(commit=True)
            SignUpView.rand_token= uuid4()
            print(SignUpView.rand_token)
            return HttpResponseRedirect(reverse('accounts:activated'))
        else:        
            return HttpResponse(r'Your Account is already activated.')
    except:
        print('exception occured')
        return HttpResponse(r'Your Account is already activated.')
    

def activated(request):
    return render(request,'activated.html')



def username_for_reset_password(request):
    try:
        print(request.POST)
        username_for_reset_password.rand_token = uuid4()
        print(username_for_reset_password.rand_token)
        str_token=str(username_for_reset_password.rand_token)
        user_obj=User.objects.get(username=request.POST.get('username'))
        subject='Password Reset Link'
        html_message = render_to_string('reset_password_link.html',{'domain':request.get_host(),'username':request.POST.get('username'),'token':str_token})
        plain_message = strip_tags(html_message)
        email_from ='manavshah1011.ms@gmail.com'
        recipirent_list=[user_obj.email,]
        print(send_mail(subject, plain_message, email_from, recipirent_list, html_message=html_message,fail_silently=False)) 
        username_for_reset_password.current_time=datetime.datetime.now()
        print(username_for_reset_password.current_time)
        return JsonResponse({'type':'success'})
    except Exception as e:
        error=str(e)
        print('Exception Occured')
        return JsonResponse({'Exception':'occured','content':error})
    
def reset_password_page(request,username,token):
    context={
        'username':username,
        'token':token
    }
    return render(request, 'reset_password.html',context)


def reset_password(request):
    if request.method == 'POST':
        formreceivedtime=datetime.datetime.now()
        print(formreceivedtime)
        onetimetoken=request.POST.get('onetimetoken')
        try:
            delta=formreceivedtime-username_for_reset_password.current_time
            print(delta.total_seconds()/60)
            print(username_for_reset_password.rand_token)
            if onetimetoken == str(username_for_reset_password.rand_token) and delta.total_seconds()/60 <=5:
                username=request.POST.get('username')
                password=request.POST.get('password')
                print(password)
                user_obj=User.objects.get(username=username)
                user_obj.set_password(password)
                user_obj.save()
                username_for_reset_password.rand_token= uuid4()
                print(username_for_reset_password.rand_token)
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
            return JsonResponse({'content':'Password has been changed','type':'success'})
        else:
            print('form is not valid')
            return JsonResponse({'errors':form.errors.as_json(),'type':'error'},safe=False)
            
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

            
    
    
    