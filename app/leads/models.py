from django.db import models

class Lead(models.Model):
    nome = models.CharField(max_length=100) #nome com limit max de 100
    email = models.EmailField(unique=True) #campo tipo email, deve ser único
    criado_em = models.DateTimeField(auto_now_add=True) #data criacao

    def __str__(self):
        return f"{self.nome} <{self.email}>"
