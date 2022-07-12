from .signals import object_viewed_singal

class ObjectViewedMixin(object):
    def get_context_data(self,*args, **kwargs):
        context= super().get_context_data(*args, **kwargs)
        request=self.request
        instance=context.get('object')
        if instance:
            object_viewed_singal.send(instance.__class__,instance=instance,request=request)
        else:
            print("No instance")
        return context 