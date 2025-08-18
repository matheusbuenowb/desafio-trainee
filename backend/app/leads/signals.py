import requests
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Lead
import os

WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL", "http://localhost:5678/webhook-test/lead")


@receiver(post_save, sender=Lead)
def send_lead_to_n8n(sender, instance, created, **kwargs):
    if created:  # só quando for um lead novo
        #url = "http://localhost:5678/webhook-test/lead"
        payload = {
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "email": instance.email,
        }
        try:
            requests.post(WEBHOOK_URL, json=payload, timeout=5)
        except Exception as e:
            print(f"Erro ao enviar lead para n8n: {e}")
