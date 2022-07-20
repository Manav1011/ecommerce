from django.shortcuts import render,get_object_or_404
from . models import Order
from django.http import HttpRequest, JsonResponse
from billing.models import BillingProfile
from accounts.models import GuestEmail

# Create your views here.

def OrderObjects(request):
    if request.user.is_authenticated:
        billing_profile_obj=BillingProfile.objects.get(user=request.user)
        object=Order.objects.filter(billing_profile=billing_profile_obj)
    else:
        guest_obj=GuestEmail.objects.get(id=request.session.get('guest_email_id'))
        billing_profile_obj=BillingProfile.objects.get(email=guest_obj.email)
        object=Order.objects.filter(billing_profile=billing_profile_obj)
    context={
        'object':object,
    }
    return render(request, 'orders/orders.html', context)


def DeleteOrder(request,pk):
    instance=get_object_or_404(Order, pk=pk)
    instance.delete()
    return JsonResponse({'deleted':True})
    
    
    
    