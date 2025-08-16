import os
import requests
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import LeadForm

def lead_form(request):
    if request.method == "POST": #verifica se o request é por meio do método POST
        form = LeadForm(request.POST) #se sim, chamamos leadform e enviamos a requisição
        if form.is_valid(): #se for válido, salvamos
            lead = form.save()

            #Aqui envia para o webhook do n8n
            webhook_url = os.getenv("N8N_WEBHOOK_URL")
            if webhook_url:
                try: #aqui tentamos enviar em formato json nome e email, com um timeout de 5 s
                    requests.post(
                        webhook_url,
                        json={"nome": lead.nome, "email": lead.email},
                        timeout=5 
                    )
                except requests.RequestException:
                    messages.error(request, "Erro ao enviar para o n8n")

            messages.success(request, "Lead cadastrada com sucesso!")
            return redirect("lead_form") #se der certo, cadastramos a lead
    else:
        form = LeadForm()

    return render(request, "leads/lead_form.html", {"form": form}) #retorna o request e o form
