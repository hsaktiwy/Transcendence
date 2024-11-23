from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import Count, Q
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Game
class GameConsumer(AsyncWebsocketConsumer):

    def get_or_create(self, user):
        try:
            list = Game.objects.annotate(
                waiting_count=Count('players', filter=Q(players__status='waiting'))
                ).filter(waiting_count__lte=1)
            if not list:
                _obj = Game.objects.create()
                _obj
                
        except:
            return None
    async def connect(self):
        user = self.scope['user']
        if user.is_authenticated:
            # SEARCH FOR  available game else create it
            Game = await sync_to_async(self.get_or_create_game)(user)
        else:
            print("Anonymous user attempted to connect.")
            await self.close()