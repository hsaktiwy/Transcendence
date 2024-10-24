import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from conversations.models import Channel, Message
from conversations.serializers import UserSerializer
from django.utils.dateformat import format
from channels.exceptions import StopConsumer
from users.models import MyUser
from status.models import Notification
from friendship.models import Friendship
from datetime import datetime
from status.serializers import NotificationSerializer

class ChatConsumer(AsyncWebsocketConsumer):


    def create_add_friend_notification(self, receiver, sender):
        try:
            not_content = f'{sender} sends you a friend request'
            user = MyUser.objects.filter(login=receiver).first()
            notification = Notification.objects.create(id_user_fk=user, content=not_content, type='friendship')
            # friendship = Friendship.objects.create(user=sender, friend=user)
            return notification, user.id
        except Exception as e:
            print(f'error  : {e}')
            return None
    def create_message_notification(self, receiver, sender, message):
        try:
            not_content = f'{sender} : {message}'
            user = MyUser.objects.filter(login=receiver).first()
            notification = Notification.objects.create(id_user_fk=user, content=not_content, type='message')
            return notification, user.id
        except Exception as e:
            print(f'error  : {e}')
            return None

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
    def get_SerializedNotification(self, notification):
        try:
            print(NotificationSerializer(notification).data)
            return (NotificationSerializer(notification).data)
        except:
            return None
    def get_sender(self, user):
        try:
            return (UserSerializer(user).data)
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
            print(f"User {user} is authenticated, proceeding to get channels.")
            try:
                self.user_id = user.id
                self.notification_group_name = f'notification_user_{user}'
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
            if message_json['type'] == 'NOTIFICATION_ADD_FRIEND' or 'NOTIFICATION_MESSAGE':
                print(text_data)
                receiver = message_json['to']
                channel_id = -1
                if message_json['type'] == 'NOTIFICATION_ADD_FRIEND':
                    notification, receiver_id = await sync_to_async(self.create_add_friend_notification)(receiver, user)
                else:
                    channel_id = message_json["channel_id"]
                    notification, receiver_id = await sync_to_async(self.create_message_notification)(receiver, user, message_json['message'])
                group_name = f'notification_user_{receiver}'

                notificationSerialized = await sync_to_async(self.get_SerializedNotification)(notification)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                print(f"id: {notificationSerialized['id']}")
                # print(f"content: {notificationSerialized['content']}")
                # print(f"created: {notificationSerialized['created']}")
                # print(f"notification_type: {notificationSerialized['notification_type']}")
                # print(f"is_readed: {notificationSerialized['is_readed']}")
                # print(f"id_user_fk: {notificationSerialized['id_user_fk']}")
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'notification',
                        'id': notificationSerialized['id'],
                        'content': notificationSerialized['content'],
                        'created': notificationSerialized['created'],
                        'channel_id' : channel_id,
                        'notification_type': notificationSerialized['type'],
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender['login']
                    }
                )


                
        except Exception as e:
            print(f"Error while receiving/sending message: {e}")
    
    async def send_message(self, event):
        message = json.dumps(event)
        print(f"Sending packet: {message}")
        await self.send(text_data=message)

    async def notification(self, event):

        event['type'] = event['notification_type']
        del event['notification_type']
        message = json.dumps(event)
        await self.send(text_data=message)
    

