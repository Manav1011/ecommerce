from accounts.forms import SignUpForm,UsernameForPasswordReset
from ecommerce.forms import ContactForm
from django.contrib.auth.forms import AuthenticationForm,PasswordChangeForm

def categories_processor(request):       
 return {'signup_form': SignUpForm()
         ,'login_form':AuthenticationForm()
         ,'contact_form':ContactForm(request.POST or None)
         ,'usernameforpasswordresetform':UsernameForPasswordReset(request.POST or None)
         ,'passwordchangeform':PasswordChangeForm(request.user)
         }