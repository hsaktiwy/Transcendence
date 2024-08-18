import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from conversations.models import Channel, Message
from conversations.serializers import UserSerializer
from django.utils.dateformat import format
from channels.exceptions import StopConsumer

class ChatConsumer(AsyncWebsocketConsumer):

    def get_user_channels(self, user_id):
        try:
            return Channel.objects.filter(users__id=user_id)
        except:
                return None
    
    def creatMessage(self, user, room_id, message, message_id, lastUpdate):
        try:
            channel = Channel.objects.get(id=room_id)
            message_obj = Message.objects.create(sender=user, id_channel_fk=channel, content=message)
            updated_channel = Channel.objects.get(id=room_id)
            
            return message_obj.id, updated_channel.last_update
        except Exception as e:
            print(f'Error while trying to create a Message : {e}')
            return

    def get_SerializedUser(self, user):
        try:
            return (UserSerializer(user))
        except:
            return None

    async def add_groups(self, channels, user):
        async for channel in channels:
            room_name = f'CHATROOM{channel.id}'
            print(f"Adding room: {room_name}")
            self.rooms.add(room_name)
            print(f'Room {room_name}, added to the {user.login} goups')

            await self.channel_layer.group_add(
                room_name,
                self.channel_name
            )
            await self.channel_layer.group_send(
                room_name,
                {
                    'type': 'send_message',
                    'channel_id' : channel.id,
                    'username': user.login,
                    'ConversationType' : 'Connection',
                    'message': f'ok, I am in channel {room_name}'
                }
            )
    async def connect(self):
        
        # first let get the room name
        user = self.scope['user']
        if user.is_authenticated:
            print(f'channel name  = {self.channel_name}')
            print(f"User {user.id} is authenticated, proceeding to get channels.")
            try:
                self.user_id = user.id
                self.notification_group_name = f'notification_user_{self.user_id}'
                await self.channel_layer.group_add(self.notification_group_name, self.channel_name)
                channels = await sync_to_async(self.get_user_channels)(user.id)
                self.rooms = set()
                await self.add_groups(channels, user)
                await self.accept()
            except Exception as e:
                print(f"Error while connecting to channels: {e}")
                await self.close()
        else:
            print("Anonymous user attempted to connect.")
            await self.close()

    async def disconnect(self, code):
        for room in self.rooms :
            await self.channel_layer.group_discard(
                room,
                self.channel_name
            )
    
    async def receive(self, text_data):
        try:
            user = self.scope['user']
            print(f'data dial zab = {text_data}')
            message_json = json.loads(text_data)
            if message_json['type'] == 'MESSAGE':
                message = message_json['message']
                room = message_json['channel']
                room_id = int(room.split("CHATROOM")[1])
                message_id = 0
                lastUpdate = None
                # create the message
                if room.startswith('CHATROOM'):
                    message_id, lastUpdate= await sync_to_async(self.creatMessage)(user,room_id, message, message_id, lastUpdate)
                SerializedUser = await sync_to_async(self.get_SerializedUser)(user)
                SerializedReceiver = await sync_to_async(self.get_SerializedUser)(user)
                lastUpdate = format(lastUpdate, 'Y-m-d H:i:s')
                await self.channel_layer.group_send(
                    room,
                    {
                        'type' : 'send_message',
                        'channel' : room_id,
                        'message_id' : message_id,
                        'LastUpdate' : lastUpdate,
                        'ConversationType' : 'Message',
                        'user' : SerializedUser.data,
                        'message' : message
                    }
                )
        except Exception as e:
            print(f"Error while receiving/sending message: {e}")
    
    async def send_message(self, event):
        message = json.dumps(event)
        print(f"Sending packet: {message}")
        await self.send(text_data=message)

