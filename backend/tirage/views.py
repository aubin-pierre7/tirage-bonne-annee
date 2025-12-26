from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Inscription, Gagnant
from .serializers import InscriptionSerializer, GagnantSerializer
from django.db.models import Count

@api_view(['GET'])
def count_inscriptions(request):
    count = Inscription.objects.count()
    return Response({'count': count})

@api_view(['GET'])
def liste_gagnants(request):
    gagnants = Gagnant.objects.all()
    serializer = GagnantSerializer(gagnants, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ajouter_inscription(request):
    serializer = InscriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
