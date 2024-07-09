from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from .serializers import Game, GameSerializer
from .models import GameEnumStatus
from rest_framework.response import Response
# Create your views here.
class ListGames(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class CreateGame(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class DestroyGame(generics.DestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ListGamesWaiting(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.WAITING.value)

class ListGamesInProgress(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.IN_PROGRESS.value)

class ListGamesEnded(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.ENDED.value)

class ChangeGameStatus(APIView):
    def put(self, request ,game_id, status_index, **kwargs):
        try:
            game = Game.objects.get(id=game_id)
            game.status = GameEnumStatus[status_index.upper()].value
            game.save()
            return Response({'message': 'Game status updated successfully'}, status=status.HTTP_200_OK)
        except Game.DoesNotExist:
           return Response({'message': 'Invalid status index : ' + str(game_id)}, status=status.HTTP_404_BAD_REQUEST)
        except KeyError as e:
            return Response({'Error': "Something went wrong : " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
