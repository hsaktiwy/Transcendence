from django.shortcuts import render
from rest_framework import generics
from .serializers import Game, GameSerializer
from .models import GameEnumStatus

# Create your views here.
class ListGames(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ListGamesWaiting(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.WAITING.value)

class CreateGame(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer