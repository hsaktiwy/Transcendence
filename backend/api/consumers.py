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
from friendship.models import FriendShip, FriendRequest
from datetime import datetime
from status.serializers import NotificationSerializer
from django.db.models import Q
from friendship.models import BlockList, FriendShip
from users.serializers import PublicUserSerializer
from django.db.models import Q

class ChatConsumer(AsyncWebsocketConsumer):

    
    def get_user_friends_group_names(self, user):
        try:
            list_s = FriendRequest.objects.filter(Q(sender=user, status='accepted'))
            friend_group_list = []
            for s in list_s:
                group_name = f'notification_user_{s.receiver.login}'
                friend_group_list.append(group_name)
            list_r = FriendRequest.objects.filter(Q(receiver=user, status='accepted'))
            for s in list_r:
                group_name = f'notification_user_{s.sender.login}'
                friend_group_list.append(group_name)
            return friend_group_list
        except Exception as e:
            return None


    def create_add_friend_notification(self, _receiver, _sender):
        try:
            not_content = f'{_sender.login} sends you a friend request'
            receiver = MyUser.objects.filter(login=_receiver).first()
            print(not_content)
            existing_rev_request = FriendRequest.objects.filter(sender=receiver, receiver=_sender).first()
            if existing_rev_request:
                return 0, None, None, None
            friendreq = FriendRequest.objects.create(sender=_sender, receiver=receiver)
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='friendship', friend_request_id=friendreq.id)
            return 1, notification, receiver.id, friendreq.id
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None
    def accept_friend_notification(self, _receiver, _sender):
        try:
            not_content = f'{_sender.login} accepted your friend request'
            receiver = MyUser.objects.filter(login=_receiver).first()
            acceptedFriendReq = FriendRequest.objects.filter(sender=receiver, receiver=_sender, status="accepted").first()
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='friendship', friend_request_id=acceptedFriendReq.id)
            rev_notif = Notification.objects.filter(id_user_fk=_sender, friend_request_id=acceptedFriendReq.id).first()
            if rev_notif:
                rev_notif.is_readed = True
                rev_notif.save()
            return 1, notification, receiver.id, acceptedFriendReq.id     
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None
    def create_message_notification(self, receiver, sender, message):
        try:
            not_content = f'{sender.login} : {message}'
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
    def check_if_valide_message(self, user, room_id):
        try:
            channel = Channel.objects.get(id=room_id)
            otherUser = channel.users.filter(~Q(id=user.id)).first()
            list1, create1 = BlockList.objects.get_or_create(user=user)
            list2, create2 = BlockList.objects.get_or_create(user=otherUser)
            if list1:
                isblock = list1.block_users.filter(id=otherUser.id).exists()
                if isblock:
                    return False, 'BLOCKED!'
            if list2:
                isblock = list2.block_users.filter(id=user.id).exists()
                if isblock:
                    return False, 'BLOCKED!'
            friendship = FriendShip.objects.filter((Q(user=user) & Q(friend=otherUser)) | (Q(user=otherUser) & Q(friend=user))).exists()
            if not friendship:
                return False, 'NOT A FRIEND!'
            return True, 'CLEAR'
        except Exception as e:
            print(e)
            return False, "CAN'T DO THAT!"

    @database_sync_to_async
    def get_user_channel(self, channe_id):
        try:
            return Channel.objects.filter(id=channe_id).first()
        except:
            return None

    def creatMessage(self, user, room_id, message, message_id, lastUpdate):
        try:
            channel = Channel.objects.get(id=room_id)
            message_obj = Message.objects.create(sender=user, id_channel_fk=channel, content=message)
            updated_channel = Channel.objects.get(id=room_id)
            
            return message_obj.id, updated_channel.last_update, message_obj.timestamp, message_obj.isread
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
            return (PublicUserSerializer(user).data)
        except:

            return None

    def set_messages_isread_to_true(self , user, channel_id, start_id):
        try:
            if start_id > 0:
                # 20 is the message range that i use to paginate the messages in the chat
                print(start_id, channel_id, user)
                Message.objects.filter(Q(id__gte=start_id) & Q(id_channel_fk=channel_id) & ~Q(sender=user)).update(isread=True)
        except Exception as e:
            print(f'Error while trying to create a Message : {e}')

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
    async def add_group(self, channel, user):
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
            state = 'online'
            try:
                await self.update_and_broadcast_state(user , state)
            except Exception as e:
                print(f"Error updating and broadcasting state: {e}")
            print(f'channel name  = {self.channel_name}')
            print(f"User {user} is authenticated, proceeding to get channels.")
            try:
                self.user_id = user.id
                self.notification_group_name = f'notification_user_{user.login}'
                print(self.notification_group_name)
                await self.channel_layer.group_add(self.notification_group_name, self.channel_name)
                channels = await sync_to_async(self.get_user_channels)(user.id)
                # print(channels)
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
        user = self.scope['user']
        state = 'offline'
        try:
            await self.update_and_broadcast_state(user , state)
        except Exception as e:
            print(f"Error updating and broadcasting state: {e}")
        for room in self.rooms :
            await self.channel_layer.group_discard(
                room,
                self.channel_name
            )
    @sync_to_async
    def increment_sessions(self, user):
        if user.sessions is None:
            user.sessions = 0
        user.sessions += 1
        user.save()

    @sync_to_async
    def decrement_sessions(self, user):
        if user.sessions is not None and user.sessions > 0:
            user.sessions -= 1
            user.save()

    def has_active_sessions(self, user):
        return user.sessions > 0 

    def is_online(self, user):
        return user.state == 'online' or user.state == 'in_game'
    
    async def update_and_broadcast_state(self, user, state):
        if state == 'online':
            await self.increment_sessions(user)
 
        elif state == 'offline':
            await self.decrement_sessions(user)
            if self.has_active_sessions(user):
                return
        user.state = state
        await sync_to_async(user.save)() 
        friend_groups_list = await sync_to_async(self.get_user_friends_group_names)(user)
        if (friend_groups_list == None):
            return 
        SerializedSender = await sync_to_async(self.get_sender)(user)
        for group_name in friend_groups_list:
            try:
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': 'state',
                        'sender': SerializedSender,
                        'state': state
                    }
                )
            except Exception as e:
                print(f"Error sending to group {group_name}: {e}")

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
                # we need to cehck if the room exist ?
                if room not in self.rooms:
                    print(f"--->Try to creat the channel  chatroom cause not there {room_id}?")
                    channel = await self.get_user_channel(room_id)
                    await self.add_group(channel, user)
                # create the message
                # check if the user is not in the block list
                valide, Error = await sync_to_async(self.check_if_valide_message)(user,room_id)
                print(valide)
                if valide:
                    message_id, lastUpdate, message_timestamp, message_isread= await sync_to_async(self.creatMessage)(user,room_id, message, message_id, lastUpdate)
                    SerializedUser = await sync_to_async(self.get_SerializedUser)(user)
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
                            'message' : message,
                            'timestamp': message_timestamp.isoformat(),
                            'isread': message_isread
                        }
                    )
                else:
                    responce = {
                        'type': 'NOTIFICATION',
                        'content' : Error,
                        'notification':'Error'
                    }
                    await self.send(text_data=json.dumps(responce))
            if message_json['type'] == 'NOTIFICATION_MESSAGE':
                print(text_data)
                receiver = message_json['to']
                channel_id = message_json["channel_id"]
                notification, receiver_id = await sync_to_async(self.create_message_notification)(receiver, user, message_json['message'])
                group_name = f'notification_user_{receiver}'
                notificationSerialized = await sync_to_async(self.get_SerializedNotification)(notification)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': notificationSerialized['type'],
                        'id': notificationSerialized['id'],
                        'content': notificationSerialized['content'],
                        'created': notificationSerialized['created'],
                        'channel_id' : channel_id,
                        'friend_request_id' : -1,
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender
                    }
                )
            elif message_json['type'] == 'NOTIFICATION_ADD_FRIEND':
                receiver = message_json['to']
                success,notification, receiver_id, friend_request_id = await sync_to_async(self.create_add_friend_notification)(receiver, user)
                group_name = f'notification_user_{receiver}'
                if (success == 0):
                    return 
                notificationSerialized = await sync_to_async(self.get_SerializedNotification)(notification)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                print(f"id: {notificationSerialized['id']}")
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': notificationSerialized['type'],
                        'id': notificationSerialized['id'],
                        'content': notificationSerialized['content'],
                        'created': notificationSerialized['created'],
                        'channel_id' : -1,
                        'friend_request_id' : friend_request_id,
                        'friend_req_status' : 'pending',
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender
                    }
                )
            elif message_json['type'] == 'NOTIFICATION_ACCEPT_FRIEND':
                receiver = message_json['to']
                success,notification, receiver_id, friend_request_id = await sync_to_async(self.accept_friend_notification)(receiver, user)
                group_name = f'notification_user_{receiver}'
                if (success == 0):
                    return 
                notificationSerialized = await sync_to_async(self.get_SerializedNotification)(notification)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                await self.channel_layer.group_send(
                    group_name,
                    {
                        'type': notificationSerialized['type'],
                        'id': notificationSerialized['id'],
                        'content': notificationSerialized['content'],
                        'created': notificationSerialized['created'],
                        'channel_id' : -1,
                        'friend_request_id' : friend_request_id,
                        'friend_req_status' : 'accepted',
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender
                    }
                )
            elif message_json['type'] == 'NOTIFICATION_STATE':
                state = message_json['state']
                if state in ['online', 'offline', 'in_game']:
                    try:
                        await self.update_and_broadcast_state(user , state)
                    except Exception as e:
                        print(f"Error updating and broadcasting state: {e}")

            elif message_json['type']=="READ":
                first_index = int(message_json['first_index'])
                channel_id = int(message_json['channel'])
                # update the message status in the range
                await sync_to_async(self.set_messages_isread_to_true)(user, channel_id, first_index)
            else:
                print(f"Unknown message type: {message_json['type']}")
            # game session, games [,]
                
        except Exception as e:
            print(f"Error while receiving/sending message: {e}")
    
    async def send_message(self, event):
        message = json.dumps(event)
        print(f"Sending packet: {message}")
        await self.send(text_data=message)

    async def friendship(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)
        
    async def message(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def state(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)
