from django.urls import path
from . import views

#criando rotas das páginas

urlpatterns = [
    path('', views.lead_form, name='lead_form'),
    path('success/', views.success, name='success'),
    path("api/leads/", views.create_lead, name="create_lead"), #rota para criação de leads 
    path('api/leads/list/', views.list_leads, name='list_leads'), #rota para lista de leads
]
