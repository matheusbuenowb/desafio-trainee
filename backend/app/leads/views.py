import os
import requests
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import IntegrityError
from .forms import LeadForm
from .models import Lead
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from rest_framework import viewsets
from .models import Lead
from .serializers import LeadSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def lead_form(request):
    error = None
    if request.method == "POST": #verifica se o request é por meio do método POST
        form = LeadForm(request.POST) #se sim, chamamos leadform e enviamos a requisição

        if form.is_valid(): #se for válido, salvamos
            try:
                lead = form.save()
            except IntegrityError:
                error = "Este e-mail já está cadastrado"
            else:
            #Aqui envia para o webhook do n8n
                webhook_url = os.getenv("N8N_WEBHOOK_URL")
                if webhook_url:
                    try: #aqui tentamos enviar em formato json nome e email, com um timeout de 5 s
                        requests.post(
                            webhook_url,
                            json={"nome": lead.first_name, "email": lead.email},
                            timeout=5 
                        )
                    except requests.RequestException:
                        messages.error(request, "Erro ao enviar para o n8n")
            
                messages.success(request, "Lead cadastrada com sucesso!")
                return redirect("lead_form") #se der certo, cadastramos a lead
    else:
        form = LeadForm()

    return render(request, "leads/lead_form.html", {"form": form, "error": error}) #retorna o request e

def success(request):
    return render(request, 'leads/success.html')


@api_view(['POST'])  #metodo para lidar com as req POST do front react
def create_lead(request):
    print(request.data)  # log do que chega do frontend
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        lead = serializer.save() #aqui o objeto Lead é recém-criado
        notify_n8n(lead) #aqui já chama o notify n8n para mandar o webhook
        return Response({"message": "Lead criado!", "id": lead.id})
    return Response({"message": "Erro ao criar lead", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


def notify_n8n(lead): #metodo exclusivo para enviar o webhook ao n8n, chamado em create_lead
    n8n_webhook = os.getenv("N8N_WEBHOOK_URL")  # colocar no .env
    if n8n_webhook:
        payload = {
            "first_name": lead.first_name,
            "last_name": lead.last_name,
            "email": lead.email,
            "message": lead.message,
            "created_at": lead.created_at.isoformat()
        }
        try:
            response = requests.post(n8n_webhook, json=payload)
            if response.status_code != 200:
                print(f"Webhook n8n retornou {response.status_code}: {response.text}")
        except Exception as e:
            print("Erro ao enviar webhook para n8n:", e)


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
