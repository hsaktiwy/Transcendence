import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from conversations.models import Channel, Message
from conversations.serializers import UserSerializer

class ChatConsumer(AsyncWebsocketConsumer):

    def get_user_channels(self, user_id):
        try:
            return Channel.objects.filter(users__id=user_id)
        except:
                return None
    
    def creatMessage(self, user, room_id, message):
        try:
            channel = Channel.objects.get(id=room_id)
            Message.objects.create(sender=user, id_channel_fk=channel, content=message)
        except Exception as e:
            print(f'Error while trying to create a Message : {e}')
            return
    def get_SerializedUser(self, user):
        try:
            return (UserSerializer(user))
        except:
            return None

    async def connect(self):
        
        # first let get the room name
        user = self.scope['user']
        if user.is_authenticated:
            print(f"User {user.email} is authenticated, proceeding to get channels.")
            try:
                channels = await sync_to_async(self.get_user_channels)(user.id)
                print(f'channels number ')
                self.rooms = set()
                print("msg")
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
                            'ConversationType' : 'Connection',
                            'message': f'ok, I am in channel {room_name}'
                        }
                    )
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
            message_json = json.loads(text_data)
            message = message_json['message']
            room = message_json['channel']
            room_id = int(room.split("CHATROOM")[1])
            # create the message
            if room.startswith('CHATROOM'):
                await sync_to_async(self.creatMessage)(user,room_id, message)
            SerializedUser = await sync_to_async(self.get_SerializedUser)(user)

            await self.channel_layer.group_send(
                room,
                {
                    'type' : 'send_message',
                    'channel' : room_id,
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

