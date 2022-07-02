from django.shortcuts import render, redirect
from product.models import Product
from . models import Cart
from orders.models import Order
from accounts.models import GuestEmail
from billing.models import BillingProfile
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView
from addresses.models import Address

from accounts.forms import GuestForm

from addresses.forms import AddressForm

# Create your views here.


def cart_home(request):
    cart_obj, new_obj = Cart.objects.new_or_get(request)
    return render(request, 'carts/home.html', {'cart': cart_obj})


def cart_update(request):
    product_id = request.POST.get('product_id')
    if product_id is not None:
        try:
            product_obj = Product.objects.get(
                id=request.POST.get('product_id'))
        except Product.DoesNotExist:
            print("Show User Product is gone?")
        cart_obj, new_obj = Cart.objects.new_or_get(request)
        if product_obj in cart_obj.products.all():
            cart_obj.products.remove(product_obj)
        else:
            cart_obj.products.add(product_obj)
    request.session['cart_items'] = cart_obj.products.count()
    return redirect('carts:cart_home')
    # return redirect(product_obj.get_absolute_url())


def checkout_home(request):
    print(request.session.get('guest_email_id'))
    cart_obj, cart_created = cart_obj, new_obj = Cart.objects.new_or_get(
        request)
    order_obj = None
    if cart_created or cart_obj.products.count() == 0:
        return redirect('carts:cart_home')
    
    Guestform = GuestForm()
    form = AuthenticationForm()
    address_form=AddressForm()
    billing_address_form=AddressForm()
    
    billing_address_id=request.session.get('billing_address_id', None)
    shipping_address_id=request.session.get('shipping_address_id', None)
    
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data["username"], password=form.cleaned_data["password"])
            if user is not None:
                login(request, user)
                try:
                    del request.session['guest_email_id']
                    guest_email_id = None
                except:
                    pass

    billing_profile, billing_profile_created = BillingProfile.objects.new_or_get(request)
    address_qs=None
    
    if billing_profile is not None:
        order_obj, order_obj_created = Order.objects.new_or_get(billing_profile, cart_obj)        
        if request.user.is_authenticated:
            address_qs=Address.objects.filter(billing_profile=billing_profile)    
        if shipping_address_id:
            order_obj.shipping_address_id = Address.objects.get(id=shipping_address_id)
        
        if billing_address_id:
            order_obj.billing_address_id = Address.objects.get(id=billing_address_id)
        
        if billing_address_id or shipping_address_id:
            order_obj.save()

    next = request.build_absolute_uri


    if request.method=="POST":
        is_done=order_obj.check_done(request)
        if is_done:
            order_obj.mark_paid(request)
            request.session['cart_items']=0
            del request.session['cart_id']
            return redirect('carts:success') 
    context = {
        'object': order_obj,
        'billing_profile': billing_profile,
        'form': form,
        'next': next,
        'guestform': Guestform,
        'address_form':address_form,
        'billing_address_form':billing_address_form,
        'address_qs':address_qs,
    }

    return render(request, 'carts/checkout.html', context)


def checkout_done(request):
    
    return render(request,'carts/checkout_done.html')