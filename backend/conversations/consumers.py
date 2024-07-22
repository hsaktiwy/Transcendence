import json
from channels.generic.websocket import AsyncWebsocketConsumer
from users.models import MyUser
from channels.db  import database_sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # first let get the room name
        self.room = 'General'#self.scope['url_route']['kwargs']['room_name']
        self.room_group = f'chat_{self.room}'

        await self.channel_layer.group_add(
            self.room_group,
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.room_group,
            {
                'type' : 'send_message',
                'message' : 'ok'
            }
        )
        await self.accept()
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.room_group,
            self.channel_name
        )
    
    async def receive(self, text_data):
        message_json = json.loads(text_data)
        message = message_json['message']
        await self.channel_layer.group_send(
            self.room_group,
            {
                'type' : 'send_message',
                'message' : message
            }
        )
    
    async def send_message(self, event):
        message = event['message']

        print(message)
        await self.send(text_data=json.dumps({
            'type': 'hahaha',
            'message' : message 
        }))