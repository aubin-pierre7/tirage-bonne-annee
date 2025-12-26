from rest_framework import serializers
from .models import Inscription, Gagnant

class InscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inscription
        fields = '__all__'

class GagnantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gagnant
        fields = '__all__'
