from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import Count, Q
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Game
import json
class GameConsumer(AsyncWebsocketConsumer):

    def get_or_create_game(self, user):
        try:
            list = Game.objects.annotate(
                waiting_count=Count('players', filter=Q(status='waiting'))
                ).filter(waiting_count__lte=1)
            if not list:
                _obj = Game.objects.create()
                return _obj
            else:
                return list[0]
        except:
            print("Something went wrong in the get_or_create: game.consumer")
            return None
    def addplayer_to_room(self, user, Game):
        try:
            Game.players.add(user)
            return "GAMEROOM"+ str(Game.id)
        except:
            print("Error in addplayer_to_room: game.consumer")
            return ""

    async def send_message(self, event):
        # event['type'] = event['action']
        print(f"Game Socket Sending packet: {event['type']}")
        message = json.dumps(event)
        await self.send(text_data=message)

    async def debuging(self, event):
        message = json.dumps(event)
        print(f"debugin message in the game socket : {message}")
        await self.send(text_data=message)
    
    async def connect(self):
        user = self.scope['user']
        if user.is_authenticated:
            # SEARCH FOR  available game else create it
            Game = await sync_to_async(self.get_or_create_game)(user)
            # add the player to that database game recorde
            room_name = await  sync_to_async(self.addplayer_to_room)(user,Game)
            # added the player to the rooom
            if (room_name != ""):
                await self.channel_layer.group_add(
                    room_name,
                    self.channel_name
                )
            self.room_game = room_name
            await self.channel_layer.group_send(
                room_name,
                {
                    'type': 'debuging',
                    'GameRoom' : room_name,
                    'username': user.login,
                    'message': f'ok, I am in channel {room_name}'
                }
            )
            await self.accept()
        else:
            print("Anonymous user attempted to connect.")
            await self.close()

    async def disconnect(self, code):
        if self.room_game != "":
            await self.channel_layer.group_discard(
                self.room_game,
                self.channel_name
            )

    async def receive(self, text_data):
        try:
            user = self.scope['user']
            message = json.loads(text_data)

            if message['type'] == 'READY' or message['type'] == 'START':
                print("hmm : " + message['type'])
                await self.channel_layer.group_send(
                    self.room_game,
                    {
                        'type' : 'send_message',
                        'action': message['type'],
                        'sender' : message['sender']
                    }
                )
            else:
                await self.channel_layer.group_send(
                    self.room_game,
                    {
                        'type' : 'debuging',
                        'message': json.dumps(message),
                        'username' : user.login
                    }
                )
        except Exception as e:
            print(f"Error while receiving/sending message: {e}")
