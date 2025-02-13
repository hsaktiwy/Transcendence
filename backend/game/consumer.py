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
# from django.db import transaction
# import asyncio

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
    if (user.state == MyUser.IN_SEARCH and (already_in_room(user, Rooms) != None)):
        # print(f"=> user {user.login} already in room !")
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
            # print('==> delete hanging room :', room[0], "it's state :", room[3])
            Rooms.pop(i)

    # for i, room in enumerate(Rooms):
    # # if (len(room) == 4 and (room[3] == 'Forfait' or room[3] == 'Ended')):
    #     # print('==> delete hanging room :', room[0], "it's state :", room[3])
    #     Rooms.pop(i)

class ApiConsumer(WebsocketConsumer):

    def connect(self):

        user = get_user_by_unique_id_sync(self.scope['user'].unique_id)
        if not user:
            return

        # print("=> user connected to official route :", user.login)
        # print("=>", f"Client {user.unique_id}, {user.login} Connected !, state :", user.state)
        # user.state = MyUser.ONLINE #TBM
        # user.save()
        # return
        if (user.state == MyUser.IN_GAME or user.state == MyUser.IN_SEARCH):     #tbc
            # print("=>", f"User {user.login} already Playing or Looking for li 7wih!")
            self.close()
            return

        #INVITE_PROCESS
        #create a room set it to Invited state queue the first player till the second joins / the force sync is mandatory
        #check if it's invited match 
        #socket-route/invite/second-player-unique-id
        # cleaner(PPong_Rooms)

        path = self.scope['path']  # e.g. '/api/server-endpoint-socket/invite/XYZ-123'

        if path.endswith('/'):
            path = path[:-1]

        parts = path.split('/')
        #['', 'api', 'server-endpoint-socket', 'invite', 'XYZ-123']

        invited_id = None

        # Check if the next-to-last piece is 'invite'
        # for part in parts:
        #     print('====>', part)

        if len(parts) == 4 and parts[-2] == 'invite':
            invited_id = parts[-1]
            print("Invite mode. Unique ID:", invited_id)
            # user.state = MyUser.IN_GAME #debbug
            # user.save()
            self.accept()
            opponent =  MyUser.objects.filter(unique_id=invited_id).first()
            # opponent.state = MyUser.INVITED #see if that would protect from potential problem 
            # opponent.save()
                
            new_room_name = 'Bit_n3as'#str(random_room_name())  # create a short random room name
            new_room = [new_room_name, [user, self], [opponent, 'TBR'], 'Invited']
            PPong_Rooms.append(new_room)
            Show_Rooms(PPong_Rooms)
            
            # send the match_found to both the players
            self.send(json.dumps({
                'type': 'room_created',
                'role': 'p1',
                'my_id': opponent.unique_id,
                'room_name': new_room_name,
                'opponent_id': invited_id,
                'color': 'white',

                'user_name' : user.login,
                'opponent_name':opponent.login,
            }, default=str))

            #send to the second player
            return
        else:
            print("No invite segment in the path.")
            pass 


        # matcha()



        
        #INVITE_PROCESS

        # # clean the PPong_Rooms, ...
        cleaner(PPong_Rooms)
        self.accept()
        user.state = MyUser.IN_SEARCH #TBM
        user.save()

        
        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, PPong_Rooms)

        # Show_Rooms(PPong_Rooms)


    def receive(self, text_data):
        data = json.loads(text_data)
        #ser 3a t9awed, matsiftlich

    def disconnect(self, close_code):
        if close_code == 1006: #connection rejected, the session already opened
            return


        # user = self.scope['user']
        user = get_user_by_unique_id_sync(self.scope['user'].unique_id)
        if not user:
            return

        
        # print('=> user ', user.login, ', disconnected ! close_code:', close_code)
        if (user.state == MyUser.IN_SEARCH):
            room = already_in_room(user, PPong_Rooms)
            if room :
                remove_room(room[0], PPong_Rooms) #only me in room no need for it anymore
                # print('=> user ', user.login, ', removed with it\'s room ', room[0], '!')
            user.state = MyUser.ONLINE #baghi 3a y3ich
            user.save()
        elif (user.state == MyUser.IN_GAME):
            # print('=> user ', user.login, ', quitting matchmaking!')
            pass

        # Show_Rooms(PPong_Rooms)
        #idik fzeb
        #other player win forfait if the game still in play


def find_room_name(user, Rooms):
    for room in Rooms:
        if (len(room) >= 3 and (room[1][0].unique_id == user.unique_id or room[2][0].unique_id == user.unique_id)):
            return room
    return None

def already_in_room(user, Rooms):
    for room in Rooms:
        if (len(room) == 2 and room[1][0].unique_id == user.unique_id):
            return room
    return None




connections_count = {}
#{"room_name":count, "room_name2":count2, ...}

# with transaction.atomic():
# connections_count_lock = asyncio.Lock()
class GameRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = await get_user_by_unique_id(self.scope['user'].unique_id)
        if not user:
            return
        room = find_room_name(user, PPong_Rooms)

        if room:
            if (len(room) == 4 and room[3] == 'Invited'): #game_invite_case
                print('=====> To The Invitaion Room !', room[0])
                # print('=====> To The Invitaion Room, Condition met !')
                
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                connections_count[self.room_group_name] = connections_count.get(self.room_group_name, 0) + 1
                if connections_count[self.room_group_name] == 2: #both players connected
                    print("======> send game begin to both of them !")
                    data = {"type" : "match_found"} #send match_found to both of them aka (could help syncing remote game)
                    # await self.accept()
                    
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            'type': 'broadcast_event',
                            'payload': data
                        }
                    )

                elif connections_count[self.room_group_name] <= 2:
                    # user.state = MyUser.IN_GAME
                    # user.save()
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )
                    print(f"======> from group channels user ", user.login, "joind the group ! visit count :", connections_count[self.room_group_name])
                    # Accept the WebSocket connection #check this above
                    await self.accept()
                else:
                    await self.close()



            elif (len(room) >= 1): 
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                # async with connections_count_lock:
                connections_count[self.room_group_name] = connections_count.get(self.room_group_name, 0) + 1

                if connections_count[self.room_group_name] <= 2:
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )
                    # print(f"======> from group channels user ", user.login, "joind the group ! visit count :", connections_count[self.room_group_name])
                    # Accept the WebSocket connection #check this above
                    await self.accept()
                else:
                    await self.close()
                    # connections_count[self.room_group_name] += 1

    async def disconnect(self, close_code):
        # On disconnect, remove from the group
        #######################################

        # print("===> goup close code :", close_code)
        if close_code == 1006: #connection rejected, the session already opened
            return

        user = await get_user_by_unique_id(self.scope['user'].unique_id)
        if not user:
            return

        # print(f'===> Player {user.login} quitting !')
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

                if len(room) == 3:
                    room.append('Forfait')
                    # print("=> room seted", room[0] ,"Forfait.")

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
                                type='PONG',
                                user_p1=winner,
                                user_p2=loser,
                                winner=winner,
                                loser=loser,
                                score_p1=7,
                                score_p2=0
                            )
                            data = {"type" : "Forfait"}  #Forfait
                            await self.channel_layer.group_send(
                                self.room_group_name,
                                {
                                    # This is the method name that will be called (like a "handler")
                                    'type': 'broadcast_event',
                                    'payload': data
                                }
                            )
                    except Exception as e:
                        # print("Game get_profile function error :", e)
                        pass
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
        if connections_count.get(self.room_group_name):
            connections_count.pop(self.room_group_name)
        # Show_Rooms(PPong_Rooms)

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
            user = await get_user_by_unique_id(self.scope['user'].unique_id)
            if not user:
                return
            room = find_room_name(user, PPong_Rooms)
            # print('==> is the room ??', room)
            if room:
                if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                    if (len(room) == 3):
                        room.append('Ended')
                        # print("=> room seted", room[0] ,"Ended.")

                    # remove_room(room[0], PPong_Rooms)
                    # print('==> Number of rooms before :', len(PPong_Rooms))
                    # print('==> player saving in db    :', event['payload'].get('role'))
                    # print('==> Room to delete         :', room[0])
                    # print('==> Number of rooms after  :', len(PPong_Rooms))
                    # Show_Rooms(PPong_Rooms)
                    user_id1 = event['payload']['paddle']['x']
                    user_id2 = event['payload']['paddle']['y']

                    user  = await get_user_by_unique_id(user_id1)
                    print('==>', user.login)
                    user2 = await get_user_by_unique_id(user_id2)
                    profile1 = await get_profile(user)
                    profile2 = await get_profile(user2)

                    print('==>', user2.login)

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
                            type='PONG',
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
        # print("Game get_profile function error :", e)
        return None
    
@sync_to_async
def get_user_by_unique_id(unique_id):
    return MyUser.objects.filter(unique_id=unique_id).first()

def get_user_by_unique_id_sync(unique_id):
    return MyUser.objects.filter(unique_id=unique_id).first()

@sync_to_async
def create_game(type, user_p1, user_p2, winner, loser, score_p1, score_p2):
    return Game.objects.create(
        type=type,
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































#FOR CHESS
Chess_Rooms = []
# Rooms.append(["Room_name", [user1, consumer],[user2, consumer])


class ApiChessConsumer(WebsocketConsumer):
    def connect(self):

        user = get_user_by_unique_id_sync(self.scope['user'].unique_id)
        if not user:
            return

        # print("=> user connected to official route :", user.login)
        # print("=>", f"Client {user.unique_id}, {user.login} Connected !, state :", user.state)
        # user.state = MyUser.ONLINE #TBM
        # user.save()
        # return
        if (user.state == MyUser.IN_GAME or user.state == MyUser.IN_SEARCH):     #tbc
            # print("=>", f"User {user.login} already Playing or Looking for li 7wih!")
            self.close()
            return

        # # clean the PPong_Rooms, ...
        cleaner(Chess_Rooms)
        self.accept()
        user.state = MyUser.IN_SEARCH #TBM
        user.save()

        
        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, Chess_Rooms)

        # Show_Rooms(Chess_Rooms)


    def receive(self, text_data):
        data = json.loads(text_data)
        #ser 3a t9awed, matsiftlich

    def disconnect(self, close_code):
        if close_code == 1006: #connection rejected, the session already opened
            return


        user = get_user_by_unique_id_sync(self.scope['user'].unique_id)
        if not user:
            return

        
        # print('=> user ', user.login, ', disconnected ! close_code:', close_code)
        if (user.state == MyUser.IN_SEARCH):
            room = already_in_room(user, Chess_Rooms)
            if room :
                remove_room(room[0], Chess_Rooms) #only me in room no need for it anymore
                # print('=> user ', user.login, ', removed with it\'s room ', room[0], '!')
            user.state = MyUser.ONLINE #baghi 3a y3ich
            user.save()
        elif (user.state == MyUser.IN_GAME):
            # print('=> user ', user.login, ', quitting matchmaking!')
            pass

        # Show_Rooms(Chess_Rooms)
        #idik fzeb
        #other player win forfait if the game still in play






chess_connections_count = {}
#{"room_name":count, "room_name2":count2, ...}



class GameChessRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = await get_user_by_unique_id(self.scope['user'].unique_id)
        if not user:
            return
        room = find_room_name(user, Chess_Rooms)

        if room:
            if (len(room) >= 1): 
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                # async with connections_count_lock:
                chess_connections_count[self.room_group_name] = chess_connections_count.get(self.room_group_name, 0) + 1

                if chess_connections_count[self.room_group_name] <= 2:
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )
                    # print(f"======> from group channels user ", user.login, "joind the group ! visit count :", chess_connections_count[self.room_group_name])
                    # Accept the WebSocket connection #check this above
                    await self.accept()
                else:
                    await self.close()
                    # chess_connections_count[self.room_group_name] += 1

    async def disconnect(self, close_code):
        # On disconnect, remove from the group
        #######################################

        # print("===> goup close code :", close_code)
        if close_code == 1006: #connection rejected, the session already opened
            return

        user = await get_user_by_unique_id(self.scope['user'].unique_id)
        if not user:
            return

        # print(f'===> Player {user.login} quitting !')
        room = find_room_name(user, Chess_Rooms)
        if room:
            if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                if (room[1][0].state == MyUser.IN_GAME and room[2][0].state == MyUser.IN_GAME):
                    if user.unique_id == room[1][0].unique_id:
                        loser =  await get_user_by_unique_id(room[1][0].unique_id)#MyUser.objects.filter(unique_id=room[1][0].unique_id).first()
                        winner = await get_user_by_unique_id(room[2][0].unique_id)#MyUser.objects.filter(unique_id=room[2][0].unique_id).first()

                    elif user.unique_id == room[2][0].unique_id:
                        loser =  await get_user_by_unique_id(room[2][0].unique_id)#MyUser.objects.filter(unique_id=room[2][0].unique_id).first()
                        winner = await get_user_by_unique_id(room[1][0].unique_id)#MyUser.objects.filter(unique_id=room[1][0].unique_id).first()

                if len(room) == 3:
                    room.append('Forfait')
                    # print("=> room seted", room[0] ,"Forfait.")

                    try:
                        winner_profile   =  await get_profile(loser)#ProfileStatus.objects.get(id_user_fk=loser) //SWITCH TEMPORALRLY
                        loser_profile    =  await get_profile(winner)#ProfileStatus.objects.get(id_user_fk=winner)
                        if loser and winner:
                            if (loser_profile and winner_profile):
                                winner_profile._wins += 1
                                winner_profile.total_games += 1

                                loser_profile._lose += 1
                                loser_profile.total_games  += 1                    
                                
                                await sync_to_async(winner_profile.save)()
                                await sync_to_async(loser_profile.save)()

                                await create_game(
                                    type='CHESS',
                                    user_p1=winner,
                                    user_p2=loser,
                                    winner=winner,
                                    loser=loser,
                                    score_p1=1,
                                    score_p2=0
                                )
                            data = {"type" : "Forfait"}
                            await self.channel_layer.group_send(
                                self.room_group_name,
                                {
                                    # This is the method name that will be called (like a "handler")
                                    'type': 'broadcast_event_chess',
                                    'payload': data
                                }
                            )
                    except Exception as e:
                        # print("Game get_profile function error :", e)
                        pass
        ######################################
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        user.state = MyUser.ONLINE #baghi 3a y3ich
        await sync_to_async(user.save)()
        # # clean the Chess_Rooms, ...
        # cleaner(Chess_Rooms)
        # remove_room()
        if chess_connections_count.get(self.room_group_name):
            chess_connections_count.pop(self.room_group_name)
        # Show_Rooms(Chess_Rooms)

    async def receive(self, text_data):
        # Receive a message from the client
        data = json.loads(text_data)

        # Broadcast it to everyone else in the same group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                # This is the method name that will be called (like a "handler")
                'type': 'broadcast_event_chess',
                'payload': data
            }
        )

    async def broadcast_event_chess(self, event):
        if event['payload'].get('type') == 'Game_end': #check that shit
            user = await get_user_by_unique_id(self.scope['user'].unique_id)
            if not user:
                return
            room = find_room_name(user, Chess_Rooms)
            # print('==> is the room ??', room)
            if room:
                if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                    if (len(room) == 3):
                        room.append('Ended')
                        # print("=> room seted", room[0] ,"Ended.")

                    user_id1 = event['payload']['p1_id']
                    user_id2 = event['payload']['p2_id']
                    score_1  = int(event['payload']['p1_score'])
                    score_2  = int(event['payload']['p2_score'])

                    user  = await get_user_by_unique_id(user_id1)
                    user2 = await get_user_by_unique_id(user_id2)



                    if user and user2:
                        # Decide winner vs loser
                        if score_1 == score_2: #draw
                            winner_profile = await get_profile(user)
                            loser_profile  = await get_profile(user2)

                            if (winner_profile and loser_profile):
                                # winner_profile.wins += 1
                                # loser_profile.lose += 1
                                # loser_profile.draw = True
                                winner_profile.total_games += 1                  
                                loser_profile.total_games += 1
                                
                                await sync_to_async(winner_profile.save)()
                                await sync_to_async(loser_profile.save)()

                                await create_game(
                                    type='CHESS',
                                    user_p1=user,
                                    user_p2=user2,
                                    winner=user,
                                    loser=user2,
                                    score_p1=0,
                                    score_p2=0
                                )
                            # print('game setted to draw')

                        elif score_1 > score_2:
                            t_winner, t_loser = user, user2
                        elif score_1 < score_2:
                            t_winner, t_loser = user2, user

                            winner_profile = await get_profile(t_winner)
                            loser_profile  = await get_profile(t_loser)

                            if (winner_profile and loser_profile):
                                winner_profile._wins += 1
                                winner_profile.total_games += 1                  
                                
                                loser_profile._lose += 1
                                loser_profile.total_games += 1
                                
                                await sync_to_async(winner_profile.save)()
                                await sync_to_async(loser_profile.save)()

                                await create_game(
                                    type='CHESS',
                                    user_p1=t_winner,
                                    user_p2=t_loser,
                                    winner=t_winner,
                                    loser=t_loser,
                                    score_p1=score_1, #SWITCH TEMPORALRLY
                                    score_p2=score_2
                                )

        
        if (str(event['payload'].get('my_id')) == str(self.scope['user'].unique_id)):
            return

        await self.send(json.dumps(event['payload']))


