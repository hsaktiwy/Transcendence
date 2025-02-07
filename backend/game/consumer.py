from channels.generic.websocket import AsyncWebsocketConsumer
from django.db.models import Count, Q
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from .models import Game
from status.models import ProfileStatus
from users.models import MyUser
import json
import random
import string


def random_room_name(length=8):
    letters_and_digits = string.ascii_lowercase + string.digits
    return ''.join(random.choices(letters_and_digits, k=length))

from channels.generic.websocket import WebsocketConsumer
# from channels.generic.websocket import AsyncWebsocketConsumer

PPong_Rooms = []
# Rooms.append(["Room_name", user1_id, user2_id, 'State')

#getter function that get the user by it's unique id/ tba

#add state to room structure

#save in db/ must be in one way (brodcast event)

def matcha(room):
    if len(room) == 3:
        p1_user, p1_consumer = room[1]
        p2_user, p2_consumer = room[2]

        p1_user.state = MyUser.IN_GAME  #sync to asyn #to be modified
        p1_user.save()

        p2_user.state = MyUser.IN_GAME
        p2_user.save()

        p1_consumer.send(json.dumps({
            'type': 'match_found',
            'role': 'p1',
            'my_id': p1_user.unique_id,
            'room_name': room[0],
            'opponent_id': p2_user.unique_id,
            'color': 'white',

            'user_name' : p1_user.login,
            'opponent_name': p2_user.login,
        }, default=str))

        p2_consumer.send(json.dumps({
            'type': 'match_found',
            'role': 'p2',
            'my_id': p2_user.unique_id,
            'room_name': room[0],
            'opponent_id': p1_user.unique_id,
            'color': 'black',
            
            'user_name' : p2_user.login,
            'opponent_name': p1_user.login,
        }, default=str))


def get_or_create_room(user, consumer, Rooms):
    if (user.state == MyUser.IN_SEARCH and already_in_room(user, Rooms)):
        return
    #find_room
    for room in Rooms:
        if len(room) == 2 and room[1][0].unique_id != user.unique_id and room[1][0].state == MyUser.IN_SEARCH:
            room.append([user, consumer])
            matcha(room) 
            return

    #new_room
    new_room_name = str(random_room_name())  # create a short random room name
    new_room = [new_room_name, [user, consumer]]
    Rooms.append(new_room)


def cleaner(Rooms):
    #delete Hanging rooms
    for i, room in enumerate(Rooms):
        if (len(room) == 4 and (room[3] == 'Forfait' or room[3] == 'Ended')):
            print('==> delete hanging room :', room[0], "it's state :", room[3])
            Rooms.pop(i)

class ApiConsumer(WebsocketConsumer):

    def connect(self):
        # # clean the PPong_Rooms, ...
        cleaner(PPong_Rooms)
        self.accept()

        user = self.scope['user']

        print("=> user connected to official route :", user.login)
        print("=>", f"Client {user.unique_id}, {user.login} Connected !)")

        if (user.state == MyUser.IN_GAME or user.state == MyUser.IN_SEARCH):     #tbc
            print("=>", f"User {user.login} already Playing or Looking for li 7wih!")
            return

        # user.state = MyUser.ONLINE #TBM
        # user.save()
        # return

        user.state = MyUser.IN_SEARCH #TBM
        user.save()

        
        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, PPong_Rooms)

        Show_Rooms(PPong_Rooms)


    def receive(self, text_data):
        data = json.loads(text_data)
        #ser 3a t9awed, matsiftlich

    def disconnect(self, close_code):
        user = self.scope['user']

        print('=> user ', user.login, ', disconnected !')
        if (user.state == MyUser.IN_SEARCH):
            room = already_in_room(user, PPong_Rooms)
            if room :
                remove_room(room[0], PPong_Rooms) #only me in room no need for it anymore
                print('=> user ', user.login, ', removed with it\'s room ', room[0], '!')
            user.state = MyUser.ONLINE #baghi 3a y3ich
            user.save()
        elif (user.state == MyUser.IN_GAME):
                print('=> user ', user.login, ', quitting matchmaking!')

        Show_Rooms(PPong_Rooms)
        #idik fzeb
        #other player win forfait if the game still in play


def find_room_name(user, Rooms):
    for room in Rooms:
        if (len(room) == 3 and (room[1][0].unique_id == user.unique_id or room[2][0].unique_id == user.unique_id)):
            return room
    return None

def already_in_room(user, Rooms):
    for room in Rooms:
        if (len(room) == 2 and room[1][0].unique_id == user.unique_id):
            return room
    return None

class GameRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = self.scope['user']
        room = find_room_name(user, PPong_Rooms)


        if (len(room) >= 1):
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
        #######################################
        user = self.scope['user']

        print(f'===> Player {user.login} quitting !')
        room = find_room_name(user, PPong_Rooms)
        if room:
            if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                if (room[1][0].state == MyUser.IN_GAME and room[2][0].state == MyUser.IN_GAME):
                    if user.unique_id == room[1][0].unique_id:
                        loser =  await get_user_by_unique_id(room[1][0].unique_id)#MyUser.objects.filter(unique_id=room[1][0].unique_id).first()
                        winner = await get_user_by_unique_id(room[2][0].unique_id)#MyUser.objects.filter(unique_id=room[2][0].unique_id).first()

                    elif user.unique_id == room[2][0].unique_id:
                        loser =  await get_user_by_unique_id(room[2][0].unique_id)#MyUser.objects.filter(unique_id=room[2][0].unique_id).first()
                        winner = await get_user_by_unique_id(room[1][0].unique_id)#MyUser.objects.filter(unique_id=room[1][0].unique_id).first()

                    # remove_room(room[0], PPong_Rooms)
                    print("=> room seted", room[0] ,"Forfait.")
                    try:
                        loser_profile   = await get_profile(loser)#ProfileStatus.objects.get(id_user_fk=loser)
                        winner_profile  = await get_profile(winner)#ProfileStatus.objects.get(id_user_fk=winner)
                        if loser and winner:
                            if (loser_profile and winner_profile):
                                loser_profile.lose += 1
                                winner_profile.wins += 1
                                winner_profile.total_games += 1
                                loser_profile.total_games  += 1                    
                                await sync_to_async(loser_profile.save)()
                                await sync_to_async(winner_profile.save)()

                            await create_game(
                                user_p1=winner,
                                user_p2=loser,
                                winner=winner,
                                loser=loser,
                                score_p1=7,
                                score_p2=0
                            )
                            data = {"type" : "Forfait"}
                            await self.channel_layer.group_send(
                                self.room_group_name,
                                {
                                    # This is the method name that will be called (like a "handler")
                                    'type': 'broadcast_event',
                                    'payload': data
                                }
                            )
                    except Exception as e:
                        print("Game get_profile function error :", e)
                        # pass
        ######################################
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        user.state = MyUser.ONLINE #baghi 3a y3ich
        await sync_to_async(user.save)()
        # # clean the PPong_Rooms, ...
        # cleaner(PPong_Rooms)
        # remove_room()
        Show_Rooms(PPong_Rooms)

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
        if event['payload'].get('type') == 'Game_end': #check that shit
            user = self.scope['user']
            room = find_room_name(user, PPong_Rooms)
            print('==> is the room ??', room)
            if room:
                if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                    if (len(room) == 3):
                        room.append('Ended')
                        print("=> room seted", room[0] ,"Ended.")

                    # remove_room(room[0], PPong_Rooms)
                    print('==> Number of rooms before :', len(PPong_Rooms))
                    print('==> player saving in db    :', event['payload'].get('role'))
                    print('==> Room to delete         :', room[0])
                    print('==> Number of rooms after  :', len(PPong_Rooms))
                    Show_Rooms(PPong_Rooms)
                    user_id1 = event['payload']['paddle']['x']
                    user_id2 = event['payload']['paddle']['y']

                    user  = await get_user_by_unique_id(user_id1)
                    # print('==>', user.login)
                    user2 = await get_user_by_unique_id(user_id2)
                    profile1 = await get_profile(user)
                    profile2 = await get_profile(user2)

                    # print('==>', user2.login)

                    score_1 = int(event['payload']['ball']['x'])
                    score_2 = int(event['payload']['ball']['y'])

                    if user and user2:
                        # Decide winner vs loser
                        if score_1 > score_2:
                            t_winner, t_loser = user, user2
                            if (profile1 and profile2):
                                profile1.wins += 1
                                profile2.lose += 1
                        else:
                            t_winner, t_loser = user2, user
                            if (profile1 and profile2):
                                profile2.wins += 1
                                profile1.lose += 1

                        if (profile1 and profile2):
                            profile2.total_games += 1
                            profile1.total_games += 1                    

                        if (profile1 and profile2):
                            await sync_to_async(profile1.save)()
                            await sync_to_async(profile2.save)()

                        await create_game(
                            user_p1=user,
                            user_p2=user2,
                            winner=t_winner,
                            loser=t_loser,
                            score_p1=score_1,
                            score_p2=score_2
                        )
        
        if (str(event['payload'].get('my_id')) == str(self.scope['user'].unique_id)):
            return

        await self.send(json.dumps(event['payload']))


@sync_to_async
def get_profile(user):
    try:
        profile  = ProfileStatus.objects.get(id_user_fk=user)
        return profile
    except Exception as e:
        print("Game get_profile function error :", e)
        return None
    
@sync_to_async
def get_user_by_unique_id(unique_id):
    return MyUser.objects.filter(unique_id=unique_id).first()

@sync_to_async
def create_game(user_p1, user_p2, winner, loser, score_p1, score_p2):
    return Game.objects.create(
        user_p1=user_p1,
        user_p2=user_p2,
        winner=winner,
        loser=loser,
        score_p1=score_p1,
        score_p2=score_p2
    )


def Show_Rooms(Rooms):
    print("\n==> All rooms :")
    for room in Rooms:
        if len(room) >= 1:
            print("  => room :", room[0])
            for _ in range(len(room) - 1):
                if type(room[_ + 1]) == list:
                    print("   => player :", room[_ + 1][0].login, "\t\tstate :", room[_ + 1][0].state)
                else:
                    print("   => state  :", room[_ + 1])
                
    print("==> End Printing room names.\n\n")

def remove_room(room_name, Rooms):
    for i, room in enumerate(Rooms):
        if len(room) >= 1 and room_name == room[0]:
            Rooms.pop(i)





































































































Chess_Rooms = []
# Rooms.append(["Room_name", [user1, consumer],[user2, consumer])

#FOR CHESS
Chess_Gconnected_users = []

class ApiChessConsumer(WebsocketConsumer):
    user_id = 0

    def connect(self):
        self.accept()

        user = self.scope['user']

        print("=> user connected to official chess route :", user.login)

        user.state = MyUser.READY #TBM
        user.save()

        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, Chess_Rooms)

        print("=> Debugging :", Chess_Rooms)
        # clean the Rooms, ...
        # cleaner(Chess_Rooms) 


    def receive(self, text_data):
        data = json.loads(text_data)
        #ser 3a t9awed, matsiftlich

    def disconnect(self, close_code):
        print('hello')
        #idik fzeb

class GameChessRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        user = self.scope['user']
        room = find_room_name(user, Chess_Rooms)



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
        #Save things on db
        if (str(event['payload'].get('my_id')) == str(self.scope['user'].unique_id)):
            return

        await self.send(json.dumps(event['payload']))
   




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



