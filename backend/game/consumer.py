from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import Count, Q
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Game
from users.models import MyUser
import json
import random
import string


def random_room_name(length=8):
    letters_and_digits = string.ascii_lowercase + string.digits
    return ''.join(random.choices(letters_and_digits, k=length))

from channels.generic.websocket import WebsocketConsumer
# from channels.generic.websocket import AsyncWebsocketConsumer

Rooms = []
# Rooms.append(["Room_name", [user1, consumer],[user2, consumer])

def matcha(room):
    if len(room) == 3:
        p1_user, p1_consumer = room[1]
        p2_user, p2_consumer = room[2]

        p1_user.state = MyUser.IN_GAME  #sync to asyn
        p1_user.save()

        p2_user.state = MyUser.IN_GAME
        p2_user.save()

        p1_consumer.send(json.dumps({
            'type': 'match_found',
            'role': 'p1',
            'my_id': p1_user.unique_id,
            'room_name': room[0],
            'opponent_id': p2_user.unique_id,

            'user_name' : p1_user.login,
            'opponent_name': p2_user.login,
        }, default=str))

        p2_consumer.send(json.dumps({
            'type': 'match_found',
            'role': 'p2',
            'my_id': p2_user.unique_id,
            'room_name': room[0],
            'opponent_id': p1_user.unique_id,
            
            'user_name' : p2_user.login,
            'opponent_name': p1_user.login,
        }, default=str))


def get_or_create_room(user, consumer):
    #find_room
    for room in Rooms:
        if len(room) == 2 and room[1][0].unique_id != user.unique_id and room[1][0].state == MyUser.READY:
            room.append([user, consumer])
            matcha(room) 

    #new_room
    new_room_name = str(random_room_name())  # create a short random room name
    new_room = [new_room_name, [user, consumer]]
    Rooms.append(new_room)

class ApiConsumer(WebsocketConsumer):
    user_id = 0

    def connect(self):
        self.accept()

        user = self.scope['user']
        self.user_id = user.unique_id

        print("=> user connected to official route :", user.login)
        print("=>", f"Client {self.user_id}, {user.login} Connected !)")

        user.state = MyUser.READY
        user.save()

        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        # do the matching and rooms managing stuff
        get_or_create_room(user, self)

        print("=> Debugging :", Rooms)

        # clean the Rooms, ...
        # cleaner(Rooms) 


    def receive(self, text_data):
        data = json.loads(text_data)
        #ser 3a t9awed, matsiftlich

    def disconnect(self, close_code):
        print('hello')
        #idik fzeb
        #other player win forfait if the game still in play

def find_room_name(user):
    for room in Rooms:
        if (len(room) == 3 and (room[1][0].unique_id == user.unique_id or room[2][0].unique_id == user.unique_id)):
            return room

class GameRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        user = self.scope['user']
        room = find_room_name(user)

        self.room_name = room[0]
        self.room_group_name = f"game_room_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()

    async def disconnect(self, close_code):
        # On disconnect, remove from the group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Receive a message from the client
        data = json.loads(text_data)

        # Broadcast it to everyone else in the same group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                # This is the method name that will be called (like a "handler")
                'type': 'broadcast_event',
                'payload': data
            }
        )

    async def broadcast_event(self, event):

        if (str(event['payload'].get('my_id')) == self.user_id):
            return

        await self.send(json.dumps(event['payload']))




# from channels.generic.websocket import WebsocketConsumer
# # from channels.generic.websocket import AsyncWebsocketConsumer
# import json

# Gconnected_users = []
# #user1, user2, user3, ...

# Rooms = []
# # Rooms.append({
# #     "Room_name": [user1, user2]
# # })

# class ApiConsumer(WebsocketConsumer):
#     connected_users = 0
#     my_id = 0
#     user = ''

#     def connect(self):
#         self.accept()

#         user = self.scope['user']

#         print("=> AL USER :", user.login)

#         user = self.scope['url_route']['kwargs']['user_id']

#         print("=> AL USER :", user)


#         ApiConsumer.connected_users += 1
#         self.my_id = ApiConsumer.connected_users
#         self.user = user

#         Gconnected_users.append((self.my_id, self, user))

#         print("=>", f"Client {self.my_id} Connected !. (Total users {len(Gconnected_users)})")
#         # print("=>", Gconnected_users)

#         self.send(json.dumps({
#             'type': 'connection_established',
#             'my_id': self.my_id,
#             'message': f'ki rak b9it assadi9, {self.user} '
#         }))

#         if (len(Gconnected_users) == 2):
#             # notify the two players
#             room_name = str(uuid.uuid4())[:8]  # create a short random room name
#             # room_name = 'Bit_N3as'

#             p1_id, p1_consumer, p1_user = Gconnected_users[0]
#             p2_id, p2_consumer, p2_user = Gconnected_users[1]


#             #fake DATA creation !
#             users = MyUser.objects.filter(login=p1_user)
#             if users.exists():
#                 user = users.first()
#             else:
#                 user = None

#             users = MyUser.objects.filter(login=p2_user)
#             if users.exists():
#                 user2 = users.first()
#             else:
#                 user2 = None

#             Game.objects.create(user_p1=user, user_p2=user2, winner=user, loser=user2, score_p1=7, score_p2=5)
#             #

#             p1_consumer.send(json.dumps({
#                 'type': 'match_found',
#                 'my_id': p1_id,
#                 'room_name': room_name,
#                 'opponent_id': p2_id,
#                 'user_name' : p1_user,
#                 'opponent_name': p2_user,
#             }))

#             p2_consumer.send(json.dumps({
#                 'type': 'match_found',
#                 'my_id': p2_id,
#                 'room_name': room_name,
#                 'opponent_id': p1_id,
#                 'user_name' : p2_user,
#                 'opponent_name': p1_user,
#             }))

#             Gconnected_users.pop(0)
#             Gconnected_users.pop(0)
#             # Gconnected_users.pop(1)
#             # Gconnected_users.clear()

#     def receive(self, text_data):
#         data = json.loads(text_data)

#         if (data['type'] == "Websocket_message"):
#             # print("=>", f"Client {self.my_id}  :", data['message'])

#             response = {
#                 'type': 'server_response',
#                 'message': f"<Server received ur message : {data['message']}>"
#             }
#             self.send(json.dumps(response))

#     def disconnect(self, close_code):
#         print("=>", f"Client {self.my_id}  DisConnected !")
#         for i, (cid, instance, pp) in enumerate(Gconnected_users):
#             if cid == self.my_id:
#                 Gconnected_users.pop(i-1)
#                 break
#         ApiConsumer.connected_users -= 1


# class GameRoomConsumer(AsyncWebsocketConsumer):
#     async def connect(self):

#         query_string = self.scope["query_string"].decode()  # "user_id=42"
#         query_params = dict(qc.split('=') for qc in query_string.split('&'))
#         self.user_id = query_params.get('user_id', 'unknown')

#         # print("=> This consumer belongs to user_id:", self.user_id)
#         # print("  => Url :", self.scope["query_string"].decode(), '\n')

#         self.room_name = self.scope['url_route']['kwargs']['room_name']

#         self.room_group_name = f"game_room_{self.room_name}"

#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )

#         # Accept the WebSocket connection
#         await self.accept()

#     async def disconnect(self, close_code):
#         # On disconnect, remove from the group
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         # Receive a message from the client
#         data = json.loads(text_data)

#         # Broadcast it to everyone else in the same group
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 # This is the method name that will be called (like a "handler")
#                 'type': 'broadcast_event',
#                 'payload': data
#             }
#         )

#     async def broadcast_event(self, event):

#         if (str(event['payload'].get('my_id')) == self.user_id):
#             return

#         await self.send(json.dumps(event['payload']))



#fake DATA creation !
# users = MyUser.objects.filter(login=p1_user)
# if users.exists():
#     user = users.first()
# else:
#     user = None

# users = MyUser.objects.filter(login=p2_user)
# if users.exists():
#     user2 = users.first()
# else:
#     user2 = None
# if (user and user2):
#     Game.objects.create(user_p1=user, user_p2=user2, winner=user, loser=user2, score_p1=7, score_p2=5)
#



#Hasktiwy
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



