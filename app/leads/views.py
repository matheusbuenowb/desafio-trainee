import os
import requests
from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import IntegrityError
from .forms import LeadForm
from .models import Lead

def lead_form(request):
    if request.method == "POST": #verifica se o request é por meio do método POST
        nome = request.POST.get("first_name") #pega o primeiro nome
        email = request.POST.get("email") #pega o email
        form = LeadForm(request.POST) #se sim, chamamos leadform e enviamos a requisição
        Lead.objects.create(first_name = nome, email = email)

        try:
            Lead.objects.create(first_name = nome, email = email)
            return redirect("lead_form")
        except IntegrityError:
            error = "Este e-mail já está cadastrado"


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

    return render(request, "leads/lead_form.html", {"error": error}) #retorna o request e

'''
def lead_form(request):
    if request.method == "POST":
        form = LeadForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')  # redireciona para página de sucesso
    else:
        form = LeadForm()

    return render(request, 'leads/lead_form.html', {'form': form})
'''
def success(request):
    return render(request, 'leads/success.html')


