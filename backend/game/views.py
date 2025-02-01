from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from .serializers import Game, GameSerializer
from .models import GameEnumStatus, MyUser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.db.models import Q
# Create your views here.

class ListGames(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Game.objects.all()
    serializer_class = GameSerializer

# class CreateGame(generics.ListCreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Game.objects.all()
#     serializer_class = GameSerializer
@api_view(['GET'])
def CreateGame(request):
    try:
        obj = Game.objects.create()
        return Response({'Game is created': 'Game id is :' + str(obj.id)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'Error': 'Something went wrong('+str(e)+')?'}, status=status.HTTP_400_BAD_REQUEST)


class DestroyGame(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class ListGamesWaiting(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.WAITING.value)

class ListGamesInProgress(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.IN_PROGRESS.value)

class ListGamesEnded(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.filter(status=GameEnumStatus.ENDED.value)

class ChangeGameStatus(APIView):
    permission_classes = [IsAuthenticated]
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







@api_view(['GET'])
def get_match_history(request, uuid, type):
    try:
        user = MyUser.objects.get(unique_id=uuid)
        # get all games depending on the type and related to our user
        games = Game.objects.filter(Q(user_p1=user) | Q(user_p2=user)).filter(type=type).order_by('time')
        # reverce the ascending order to descending
        games = games.reverse()
        last_matches = GameSerializer(games[:5], many=True)
        return Response({'Game': last_matches.data}, status=200)
    except Exception as e:
        return Response({'error': e}, status=400)
