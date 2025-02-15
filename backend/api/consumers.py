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
from api.utils import get_cookies
# import redis

# redis_client = redis.StrictRedis(host='redis', port=6379, db=0)
class ChatConsumer(AsyncWebsocketConsumer):

    
    def get_user_friends_group_names(self, user):
        try:
            list_s = FriendRequest.objects.filter(Q(sender=user, status='accepted'))
            list_r = FriendRequest.objects.filter(Q(receiver=user, status='accepted'))
            friend_group_list = []
            for s in list_s:
                group_name = f'notification_user_{s.receiver.id}'
                friend_group_list.append(group_name)
            for s in list_r:
                group_name = f'notification_user_{s.sender.id}'
                friend_group_list.append(group_name)
            if len(friend_group_list) == 0:
                return None
            return friend_group_list
        except Exception as e:
            print(e)
            return None


    def create_add_friend_notification(self, _receiver, _sender):
        try:
            not_content = f'{_sender.unique_id} sends you a friend request'
            receiver = MyUser.objects.filter(unique_id=_receiver).first()
            sender_instance = MyUser.objects.get(id=_sender.id)
            print(not_content)
            existing_rev_request = FriendRequest.objects.filter(sender=receiver, receiver=sender_instance).first()
            if existing_rev_request:
                return 0, None, None, None
            friendreq = FriendRequest.objects.create(sender=sender_instance, receiver=receiver)
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='friendship', friend_request_id=friendreq.id)
            return 1, notification, receiver.id, friendreq.id
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None
    def accept_friend_notification(self, _receiver, _sender):
        try:
            not_content = f'{_sender.unique_id} accepted your friend request'
            receiver = MyUser.objects.filter(unique_id=_receiver).first()
            sender_instance = MyUser.objects.get(id=_sender.id)
            acceptedFriendReq = FriendRequest.objects.filter(sender=receiver, receiver=sender_instance, status="accepted").first()
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='friendship', friend_request_id=acceptedFriendReq.id)
            rev_notif = Notification.objects.filter(id_user_fk=sender_instance, friend_request_id=acceptedFriendReq.id).first()
            # channel = Channel.objects.filter(users=_sender).filter(users=receiver)
            if rev_notif:
                rev_notif.is_readed = True
                rev_notif.save()
            return 1, notification, receiver.id, acceptedFriendReq.id,# channel.first() if len(channel) > 0 else None
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None,# None
    def game_invite_notification(self, _receiver, _sender, room_name):
        try:
            receiver = MyUser.objects.filter(unique_id=_receiver).first()
            not_content = f'{_sender.unique_id} GAMEINVITE to {receiver.unique_id} room {room_name}'
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='gameInvitation', friend_request_id=-1)
            return 1, notification, receiver.id
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None,# None

    def create_message_notification(self, receiver, sender, message, channel_id):
        try:
            user = MyUser.objects.filter(unique_id=receiver).first()
            senderObj = MyUser.objects.get(id=sender.id)
            blocked = BlockList.objects.get(user=user.id).block_users.filter(id=sender.id).exists()
            blocker = BlockList.objects.get(user=sender.id).block_users.filter(id=user.id).exists()
            if blocked or blocker:
                return None, None
            friendshipExist = FriendShip.objects.filter(Q(user=user, friend=senderObj) | Q(user=senderObj, friend=user)).exists()
            channel = Channel.objects.filter(users=user).filter(users=senderObj).first()
            channel_id_2 = channel.id
            if friendshipExist and channel_id_2 == channel_id:
                not_content = f'{sender.unique_id} : {message}'
                notification = Notification.objects.create(id_user_fk=user, content=not_content, type='message', channel_id=channel_id)
                return notification, user.id
            return None, None
        except Exception as e:
            print(f'error  : {e}')
            return None, None

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
    @database_sync_to_async
    def get_user(self):
        try:
            return MyUser.objects.get(id=self.user_id)
        except:
            return None
    @database_sync_to_async
    def get_receiver(self, uuid):
        try:
            if uuid:
                return MyUser.objects.get(unique_id=uuid)
            return None
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
            userObj = MyUser.objects.get(id=user.id)
            return (PublicUserSerializer(userObj).data)
        except:

            return None

    # def get_sender_login(self, user):
    #     try:
    #         return (user.login)
    #     except:
    #         return None
    def set_messages_isread_to_true(self , user, channel_id, start_id):
        try:
            if start_id > 0:
                print(start_id, channel_id, user)
                messages_to_updates = Message.objects.filter(Q(id__gte=start_id) & Q(isread=False) & Q(id_channel_fk=channel_id) & ~Q(sender=user))
                if messages_to_updates.exists():
                    messages_to_updates.update(isread=True)
                    Notification.objects.filter(channel_id=channel_id).update(is_readed=True)
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
        try:
            if channel and user:
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
        except Exception as e:
            print(f"Error while trying to add to group: {e}")


    async def connect(self):
        
        # first let get the room name
        user = self.scope['user']
        if user.is_authenticated:
            self.cookies = get_cookies(self.scope)
            try:
                self.user_id = user.id
                self.notification_group_name = f'notification_user_{user.id}'
                print(self.notification_group_name)
                self.session_group_name = f'user_session_{self.cookies.get('csrftoken')}'
                await self.channel_layer.group_add(self.notification_group_name, self.channel_name)
                await self.channel_layer.group_add(self.session_group_name, self.channel_name)
                state = 'online'
                try:
                    await self.update_and_broadcast_state(user , state)
                except Exception as e:
                    print(f"Error updating and broadcasting state: {e}")
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
            # try:
            #     await self.update_and_broadcast_state(user , state)
            # except Exception as e:
            #     print(f"Error updating and broadcasting state: {e}")
            if self.rooms:
                for room in self.rooms :
                    await self.channel_layer.group_discard(
                        room,
                        self.channel_name

                    )
        except Exception as e:
            print(f"Error in ChatConsumer.disconnect : ", e)


    def is_online(self, user):
        return user.state == 'online' or user.state == 'in_game'
    
    async def update_and_broadcast_state(self, user, state):
        SerializedSender = await sync_to_async(self.get_sender)(user)
        if state == 'offline':
            try:
                await self.channel_layer.group_send(
                    self.session_group_name,
                    {
                        'type': 'state',
                        'sender': SerializedSender,
                        'state': state
                    }
                )
            except Exception as e:
                print(f"Error sending to group {group_name}: {e}")
        user =  await self.get_user()
        if user == None:
            return
        user.state = state
        await sync_to_async(user.save)() 
        friend_groups_list = await sync_to_async(self.get_user_friends_group_names)(user)
        if (friend_groups_list == None):
            return 
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
            print(self.scope.get('session'))
            user = self.scope['user']
            message_json = json.loads(text_data)
            # print(message_json)
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
                notification, receiver_id = await sync_to_async(self.create_message_notification)(receiver, user, message_json['message'], channel_id)
                if notification is None:
                    return
                group_name = f'notification_user_{receiver_id}'
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
                group_name = f'notification_user_{receiver_id}'
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
                # await self.add_group(channel, user)
                group_name = f'notification_user_{receiver_id}'
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
            elif message_json['type'] == 'NOTIFICATION_UNCONNECT' or message_json['type'] == 'NotifBlock' :
                uuid = user.unique_id
                receiver = message_json['to']
                receiverObj = await self.get_receiver(receiver)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                group_name = f'notification_user_{receiverObj.id}'
                dictResp = {
                        'type': 'profile_notif',
                        'action': message_json['type'],
                        'sender': SerializedSender,
                }
                if message_json.get('status'):
                    dictResp['status'] = message_json['status']
                await self.channel_layer.group_send(
                    group_name,
                    dictResp
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
            elif message_json['type'] == "GAME_INVITE":
                receiver = message_json['receiver']
                room_name = message_json['room_name']
                success,notification, receiver_id= await sync_to_async(self.game_invite_notification)(receiver, user, room_name)
                # await self.add_group(channel, user)
                group_name = f'notification_user_{receiver_id}'
                print("{{{{{{{{{{{{{{{{{{{{{{{sucess "+ str(success)+" }}}}}}}}}}}}}}}}}}}}}}}")
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
                        'friend_request_id' : -1,
                        'friend_req_status' : 'accepted',
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender,
                        'sender_id': user.id,
                        'receiver_id': receiver_id,
                        'room_name': room_name,
                    }
                )
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

    async def profile_notif(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def message(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def state(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def gameInvitation(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)