from django.shortcuts import render,get_object_or_404
from . models import Order
from django.http import HttpRequest, JsonResponse
from billing.models import BillingProfile

# Create your views here.

def OrderObjects(request):
    billing_profile_obj=BillingProfile.objects.get(user=request.user)
    object=Order.objects.filter(billing_profile=billing_profile_obj)
    context={
        'object':object,
    }
    return render(request, 'orders/orders.html', context)


def DeleteOrder(request,pk):
    instance=get_object_or_404(Order, pk=pk)
    instance.delete()
    return JsonResponse({'deleted':True})
    
    
    
    