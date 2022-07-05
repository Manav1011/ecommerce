from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name='home.html'
    
    def get_context_data(self, **kwargs):
        self.request.session['theme']='dark'
        context = super().get_context_data(**kwargs)
        context["default_theme"] = self.request.session.get('theme')
        context["state"] = 'checked'
        return context
    