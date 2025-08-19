from django.db import models

class Lead(models.Model):

    STATUS_CHOICES = [
        ("new", "Novo"),
        ("contacted", "Contatado"),
        ("qualified", "Qualificado"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Novo"
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name or ''}".strip()

