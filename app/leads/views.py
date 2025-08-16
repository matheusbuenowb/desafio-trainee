import os
import requests
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import IntegrityError
from .forms import LeadForm
from .models import Lead

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


