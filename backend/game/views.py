from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from .serializers import Game, GameSerializer
from .models import GameEnumStatus, MyUser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.db.models import Q

@api_view(['GET'])
def get_match_history(request, uuid):
    try:
        user = MyUser.objects.get(unique_id=uuid)

        pong_games = Game.objects.filter(
            Q(user_p1=user) | Q(user_p2=user),
            type='PONG'
        ).order_by('-time')[:5]

        chess_games = Game.objects.filter(
            Q(user_p1=user) | Q(user_p2=user),
            type='CHESS'
        ).order_by('-time')[:5]

        if not pong_games.exists() and not chess_games.exists():
            return Response({'matches': []}, status=200)


        pong_matches = GameSerializer(pong_games, many=True)
        chess_matches = GameSerializer(chess_games, many=True)

        return Response({
            'Pong': pong_matches.data,
            'Chess': chess_matches.data
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)
