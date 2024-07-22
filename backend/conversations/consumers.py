import json
from channels.generic.websocket import AsyncWebsocketConsumer
from users.models import MyUser
from channels.db  import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # first let get the room name
        self.room = 'General'#self.scope['url_route']['kwargs']['room_name']
        self.room_group = f'chat_{self.room}'

        await self.accept()
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group,
            self.channel_name
        )
    
    async def recieve(self, message):
        text_data = json.load(message)
        data = text_data['message']
        await self.channel_layer.group_send(
            self.room_group,
            {
                'type' : 'send_message',
                'message' : data
            }
        )
    
    async def send_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'type': 'hahaha',
           'message' : message 
        }))