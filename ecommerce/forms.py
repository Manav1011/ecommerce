from django import forms

class ContactForm(forms.Form):
    Username=forms.CharField(max_length=255, required=True)
    Email=forms.EmailField(max_length=255, required=True)
    Content=forms.CharField(required=True,widget=forms.Textarea())
    
    def __init__(self, *args, **kwargs):
        super(ContactForm, self).__init__(*args, **kwargs)
        self.fields['Username'].widget=forms.TextInput(attrs={
            'id':'u_name'
        })
        self.fields['Email'].widget=forms.EmailInput(attrs={
            'id':'e_mail'
        })
    