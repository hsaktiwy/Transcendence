import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from conversations.models import Channel, Message
from conversations.serializers import UserSerializer
from django.utils.dateformat import format
from users.models import MyUser
from status.models import Notification
from friendship.models import FriendShip, FriendRequest
from status.serializers import NotificationSerializer
from django.db.models import Q
from friendship.models import BlockList, FriendShip
from users.serializers import PublicUserSerializer
from django.db.models import Q
from api.utils import get_cookies

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
            print(f'error  : {e}')
            return None


    def create_add_friend_notification(self, _receiver, _sender):
        try:
            not_content = f'{_sender.unique_id} sends you a friend request'
            receiver = MyUser.objects.filter(unique_id=_receiver).first()
            sender_instance = MyUser.objects.get(id=_sender.id)
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
            if rev_notif:
                rev_notif.is_readed = True
                rev_notif.save()
            return 1, notification, receiver.id, acceptedFriendReq.id
        except Exception as e:
            print(f'error  : {e}')
            return 0, None, None, None,# None
    def game_invite_notification(self, _receiver, _sender, room_name):
        try:
            receiver = MyUser.objects.filter(unique_id=_receiver).first()
            not_content = f'{_sender.unique_id} invites you to play a game'
            notification = Notification.objects.create(id_user_fk=receiver, content=not_content , type='gameInvitation', friend_request_id=-1, room_name=room_name)
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
            print(f'error  : {e}')
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

    def creatMessage(self, user, room_id, message):
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
            return (NotificationSerializer(notification).data)
        except:
            return None

    def get_sender(self, user):
        try:
            userObj = MyUser.objects.get(id=user.id)
            return (PublicUserSerializer(userObj).data)
        except:

            return None

    def set_messages_isread_to_true(self , user, channel_id, start_id):
        try:
            if start_id > 0:
                messages_to_updates = Message.objects.filter(Q(id__gte=start_id) & Q(isread=False) & Q(id_channel_fk=channel_id) & ~Q(sender=user))
                if messages_to_updates.exists():
                    messages_to_updates.update(isread=True)
                    Notification.objects.filter(channel_id=channel_id).update(is_readed=True)
        except Exception as e:
            print(f'Error while trying to create a Message : {e}')

    async def add_groups(self, channels, user):
        async for channel in channels:
            room_name = f'CHATROOM{channel.id}'
            self.rooms.add(room_name)

            await self.channel_layer.group_add(
                room_name,
                self.channel_name
            )
            # await self.channel_layer.group_send(
            #     room_name,
            #     {
            #         'type': 'send_message',
            #         'channel_id' : channel.id,
            #         'username': user.login,
            #         'ConversationType' : 'Connection',
            #         'message': f'ok, I am in channel {room_name}'
            #     }
            # )
    async def add_group(self, channel, user):
        try:
            if channel and user:
                room_name = f'CHATROOM{channel.id}'
                self.rooms.add(room_name)

                await self.channel_layer.group_add(
                    room_name,
                    self.channel_name
                )
                # await self.channel_layer.group_send(
                #     room_name,
                #     {
                #         'type': 'send_message',
                #         'channel_id' : channel.id,
                #         'username': user.login,
                #         'ConversationType' : 'Connection',
                #         'message': f'ok, I am in channel {room_name}'
                #     }
                # )
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
                self.session_group_name = f'user_session_{self.cookies.get('csrftoken')}'
                await self.channel_layer.group_add(self.notification_group_name, self.channel_name)
                await self.channel_layer.group_add(self.session_group_name, self.channel_name)
                state = 'online'
                try:
                    await self.update_and_broadcast_state(user , state)
                except Exception as e:
                    print(f"Error updating and broadcasting state: {e}")
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
        try:
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
    def cleanNotifications(self, sender, receiver):
        try:
            senderObj = MyUser.objects.get(id=sender.id)
            sender_uuid =str(senderObj.unique_id)
            receiver_uuid = str(receiver.unique_id)
            notifQuerySet = Notification.objects.filter((Q(id_user_fk=senderObj ) & Q(content__startswith=receiver_uuid)) | (Q(id_user_fk=receiver) & Q(content__startswith=sender_uuid)))
            if notifQuerySet.exists():
                notifQuerySet.delete()
        except Exception as e:
            print(e)
            return
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
                if room not in self.rooms:
                    channel = await self.get_user_channel(room_id)
                    await self.add_group(channel, user)
                valide, Error = await sync_to_async(self.check_if_valide_message)(user,room_id)
                if valide:
                    message_id, lastUpdate, message_timestamp, message_isread= await sync_to_async(self.creatMessage)(user,room_id, message)
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
            elif message_json['type'] == 'NOTIFICATION_MESSAGE':
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
                receiver = message_json['to']
                receiverObj = await self.get_receiver(receiver)
                SerializedSender = await sync_to_async(self.get_sender)(user)
                if message_json['type'] == 'NotifBlock' and  message_json.get('status') == False:
                    await sync_to_async(self.cleanNotifications)(user, receiverObj)
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
                await sync_to_async(self.set_messages_isread_to_true)(user, channel_id, first_index)

            elif message_json['type'] == "GAME_INVITE":
                receiver = message_json['receiver']
                room_name = message_json['room_name']
                success,notification, receiver_id= await sync_to_async(self.game_invite_notification)(receiver, user, room_name)
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
                        'friend_request_id' : -1,
                        'friend_req_status' : 'accepted',
                        'is_readed': notificationSerialized['is_readed'],
                        'sender': SerializedSender,
                        'room_name': room_name,
                    }
                )       
        except Exception as e:
            print(f"Error while receiving/sending message: {e}")

    async def send_message(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def friendship(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def profile_notif(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def message(self, event):
        message = json.dumps(event)
        room_id = event.get('channel_id')
        room  = f"CHATROOM{room_id}"

        if room not in self.rooms:
            room_name = room
            self.rooms.add(room_name)
            await self.channel_layer.group_add(
                room_name,
                self.channel_name
            )

        await self.send(text_data=message)

    async def state(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

    async def gameInvitation(self, event):
        message = json.dumps(event)
        await self.send(text_data=message)

class NoMatchConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data="No valid route found")
        await self.close(code=4001)
