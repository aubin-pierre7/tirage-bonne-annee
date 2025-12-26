from django.db import models


class Inscription(models.Model):
    OPERATEUR_CHOICES = [
        ('Orange Money', 'Orange Money'),
        ('MTN Money', 'MTN Money'),
    ]

    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=15, unique=True)
    operateur = models.CharField(
        max_length=20,
        choices=OPERATEUR_CHOICES
    )
    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} - {self.telephone}"


class Gagnant(models.Model):
    RANG_CHOICES = [
        (1, '1er'),
        (2, '2e'),
        (3, '3e'),
    ]

    inscription = models.OneToOneField(
        Inscription,
        on_delete=models.CASCADE
    )
    rang = models.IntegerField(choices=RANG_CHOICES)
    date_tirage = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gagnant {self.rang} - {self.inscription.prenom}"
