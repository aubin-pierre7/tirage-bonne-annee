from django.urls import path
from . import views

urlpatterns = [
    path('inscriptions/count/', views.count_inscriptions),
    path('inscriptions/', views.ajouter_inscription),
    path('gagnants/', views.liste_gagnants),
]
