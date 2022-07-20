from webbrowser import get
from django import forms
from django.contrib.auth.forms import  UserCreationForm
from . import models
from django.contrib.auth import get_user_model

class UserCreateForm(UserCreationForm):
    email = forms.EmailField(required=True)

    def __init__(self, *args, **kwargs):
        super(UserCreateForm, self).__init__(*args, **kwargs)

        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None

class SignUpForm(UserCreateForm):
    class Meta:
        model=get_user_model()
        fields=('username','email','password1','password2')

    
class GuestForm(forms.ModelForm):
    class Meta:
        model=models.GuestEmail
        fields=('email',)
    
    
class UsernameForPasswordReset(forms.Form):
    username=forms.CharField(max_length=255)
    
    
    