from webbrowser import get
from django import forms
from django.contrib.auth.forms import  UserCreationForm
from . import models
from django.contrib.auth import get_user_model

class SignUpForm(UserCreationForm):
    class Meta:
        model=get_user_model()
        fields=('username','email','password1','password2')
        

    
class GuestForm(forms.ModelForm):
    class Meta:
        model=models.GuestEmail
        fields=('email',)
    
    
class UsernameForPasswordReset(forms.Form):
    username=forms.CharField(max_length=255)
    
    
    