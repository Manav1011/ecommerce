from django.db import models
from billing.models import BillingProfile

# Create your models here.

ADD_TYPES=(
    ('billing',"Billing"),
('shipping','Shipping')
)        

class Address(models.Model): 
    billing_profile=models.ForeignKey(BillingProfile,on_delete=models.CASCADE)
    add_type=models.CharField(max_length=255,choices=ADD_TYPES)
    address_line_1=models.CharField(max_length=255)
    address_line_2=models.CharField(max_length=255,null=True,blank=True)
    city=models.CharField(max_length=255)
    country=models.CharField(max_length=255,default='India')
    state=models.CharField(max_length=255)
    postal_code=models.CharField(max_length=255)
    
    @property
    def address(self):
        address_=f'{self.address_line_1} \n {self.address_line_2} \n {self.city}, {self.postal_code} \n {self.state} \n {self.country}'
        return address_
    
    def __str__(self):
        return self.billing_profile.email +' -- '+ self.add_type
    
    
    