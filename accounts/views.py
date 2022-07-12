from django.shortcuts import render,redirect
from django.urls import reverse,reverse_lazy
from django.views.generic import CreateView
from . import forms
from django.utils.http import url_has_allowed_host_and_scheme
from . import models
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponseRedirect,JsonResponse
from django.contrib.auth import login,authenticate
from carts.views import is_ajax


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

            
    
    
    