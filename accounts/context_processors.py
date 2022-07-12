from accounts.forms import SignUpForm
from ecommerce.forms import ContactForm
from django.contrib.auth.forms import AuthenticationForm

def categories_processor(request):       
 return {'signup_form': SignUpForm(),'login_form':AuthenticationForm(),'contact_form':ContactForm(request.POST or None)}