from webbrowser import get
from django import forms
from django.contrib.auth.forms import  UserCreationForm
from . import models
from django.contrib.auth import get_user_model


class UserCreateForm(UserCreationForm):
    email = forms.EmailField(required=True)

    def __init__(self, *args, **kwargs):
        super(UserCreateForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget=forms.TextInput(attrs={
            'pattern':'[A-Za-z0-9@_+-.]+',
            'id':'signupusername',
        })
        self.fields['password1'].widget=forms.PasswordInput(attrs={
            'id':'signuppassword',
            'minlength':'8'
        })
        self.fields['password1'].widget=forms.PasswordInput(attrs={
            'id':'signupconfirmpassword',
            'minlength':'8'
        })

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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget=forms.TextInput(attrs={
            'pattern':'[A-Za-z0-9@_+-.]+',
            'id':'signupusername',
        })
    
    
    