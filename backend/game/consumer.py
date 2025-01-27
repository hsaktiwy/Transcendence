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



#/////////


from channels.generic.websocket import WebsocketConsumer
# from channels.generic.websocket import AsyncWebsocketConsumer
import json

Gconnected_users = []

class ApiConsumer(WebsocketConsumer):
    connected_users = 0
    my_id = 0

    def connect(self):
        self.accept()
        ApiConsumer.connected_users += 1
        self.my_id = ApiConsumer.connected_users

        Gconnected_users.append((self.my_id, self))

        print("=>", f"Client {self.my_id} Connected !. (Total users {len(Gconnected_users)})")
        # print("=>", Gconnected_users)

        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': self.my_id,
            'message': f'ki rak b9it assadi9, nta hwa {self.my_id} '
        }))

        if (len(Gconnected_users) == 2):
            # notify the two players
            # room_name = str(uuid.uuid4())[:8]  # create a short random room name
            room_name = 'Bit_N3as'

            p1_id, p1_consumer = Gconnected_users[0]
            p2_id, p2_consumer = Gconnected_users[1]

            p1_consumer.send(json.dumps({
                'type': 'match_found',
                'my_id': p1_id,
                'room_name': room_name,
                'opponent_id': p2_id,
            }))

            p2_consumer.send(json.dumps({
                'type': 'match_found',
                'my_id': p2_id,
                'room_name': room_name,
                'opponent_id': p1_id,
            }))

            Gconnected_users.clear()

    def receive(self, text_data):
        data = json.loads(text_data)

        if (data['type'] == "Websocket_message"):
            # print("=>", f"Client {self.my_id}  :", data['message'])

            response = {
                'type': 'server_response',
                'message': f"<Server received ur message : {data['message']}>"
            }
            self.send(json.dumps(response))

    def disconnect(self, close_code):
        print("=>", f"Client {self.my_id}  DisConnected !")
        # ApiConsumer.connected_users -= 1
        # Gconnected_users.remove(self.my_id)
        for i, (cid, instance) in enumerate(Gconnected_users):
            if cid == self.my_id:
                Gconnected_users.pop(i)
                break


class GameRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        query_string = self.scope["query_string"].decode()  # "user_id=42"
        query_params = dict(qc.split('=') for qc in query_string.split('&'))
        self.user_id = query_params.get('user_id', 'unknown')

        # print("=> This consumer belongs to user_id:", self.user_id)
        # print("  => Url :", self.scope["query_string"].decode(), '\n')

        # if self.scope["user"].is_authenticated:
            # print("=> Authenticated user:", self.scope["user"].username)
        # else:
            # print("=> Anonymous user")

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        # print("=>", "Room created :", self.room_name)

        # Create a group name, e.g. "game_room_<room_name>"
        self.room_group_name = f"game_room_{self.room_name}"

        # Join the group (everyone in the same room_name joins this group)
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

        # print(event['payload'].get('my_id'), self.user_id)
        if (str(event['payload'].get('my_id')) == self.user_id):
            return

        # print(type(event['payload'].get('my_id')), type(self.user_id))
        # event['payload'].get('my_id')
        # Forward the broadcasted message to the actual WebSocket
        # so all connected clients in the group see it
        # print("=>", "from the player ", self.user_id, ":")
        # print("=>", "All players gonna recieve : ", event['payload'])
        await self.send(json.dumps(event['payload']))


