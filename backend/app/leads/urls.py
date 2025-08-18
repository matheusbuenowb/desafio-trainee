from django.urls import path
from . import views

#criando rotas das páginas

urlpatterns = [
    path('', views.lead_form, name='lead_form'),
    path('success/', views.success, name='success'),
]
