from django import forms

class ContactForm(forms.Form):
    FullName=forms.CharField(max_length=255, required=True)
    Email=forms.EmailField(max_length=255, required=True)
    Content=forms.CharField(required=True,widget=forms.Textarea())
    
    
    