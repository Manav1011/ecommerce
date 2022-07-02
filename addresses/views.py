from django.shortcuts import render,redirect
from . forms import AddressForm
from django.utils.http import url_has_allowed_host_and_scheme
from django.urls import reverse
from . models import Address
from billing.models import BillingProfile
# Create your views here.

def checkout_address_create_view(request):
    form=AddressForm(request.POST)
    context={
        'form': form,
    }
    if form.is_valid():
        print(request.POST) 
        next=request.POST.get('next')
        next_post=request.POST.get('next')
        redirect_path=next or next_post or None
        
        instance=form.save(commit=False)
        billing_profile,billing_profile_created=BillingProfile.objects.new_or_get(request)
        if billing_profile is not None:
            address_type=request.POST.get('address_type')
            instance.billing_profile=billing_profile
            instance.add_type=request.POST.get('address_type')
            instance.save()
            
            request.session[address_type +'_address_id']=instance.id
            
            print("here")
            print(address_type+'_address_id')
            print(request.session.get(address_type +'_address_id'))
            print(instance.id)
            print("here")
            
        else:
            print("Error here")
            return redirect(redirect_path)
            
        if url_has_allowed_host_and_scheme(redirect_path,request.get_host()):
            return redirect(redirect_path)  
    return redirect('carts:checkout')
    
    
def checkout_address_reuse_view(request):
    if request.user.is_authenticated:
        next=request.POST.get('next')
        next_post=request.POST.get('next')
        redirect_path=next or next_post or None
        if request.method == 'POST':
            print(request.POST) 
            shipping_address=request.POST.get('shipping_address')
            billing_profile,billing_profile_created=BillingProfile.objects.new_or_get(request)
            address_type=request.POST.get('address_type')
            qs=Address.objects.filter(billing_profile=billing_profile,id=shipping_address)
            if qs.exists():
                request.session[address_type +'_address_id']=shipping_address
            if url_has_allowed_host_and_scheme(redirect_path,request.get_host()):
                return redirect(redirect_path)        
    return redirect('carts:checkout')
    