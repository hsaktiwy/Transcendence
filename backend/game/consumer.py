from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
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

def find_room_name(user, Rooms):
    for room in Rooms:
        if (len(room) >= 2 and (room[1][0].unique_id == user.unique_id)) or (len(room) >= 3 and (room[2][0].unique_id == user.unique_id)):
            return room
    return None

def eliminate_dups(room_name, Rooms):
    count = 0
    for room in Rooms:
        if (len(room) >= 1 and room[0] == room_name):
            count += 1
    if count == 2:
        remove_room(room_name, Rooms)
    return Rooms[room_name]

PPong_Rooms = []

def matcha(room):
    if len(room) == 3:
        p1_user, p1_consumer = room[1]
        p2_user, p2_consumer = room[2]

        p1_user = sync__get_user(p1_user.unique_id)
        p2_user = sync__get_user(p2_user.unique_id)

        if (p1_user and p2_user):
            p1_user.game_state = MyUser.IN_GAME
            p2_user.game_state = MyUser.IN_GAME
            
            p1_user.save()
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
    user = sync__get_user(user.unique_id)

    if (user.game_state != MyUser.ONLINE and (find_room_name(user, Rooms))):
        return
    for room in Rooms:
        if len(room) == 2:
            mdar = sync__get_user(room[1][0].unique_id)
            if mdar and mdar.unique_id != user.unique_id and mdar.game_state == MyUser.IN_SEARCH:
                room.append([user, consumer])
                matcha(room) 
                return

    new_room_name = str(random_room_name())
    new_room = [new_room_name, [user, consumer]]
    Rooms.append(new_room)


def cleaner(Rooms):
    for i, room in enumerate(Rooms):
        if (len(room) >= 4 and (room[3] == 'Forfait' or room[3] == 'Ended')):
            Rooms.pop(i)

class ApiConsumer(WebsocketConsumer):

    def connect(self):

        user = sync__get_user(self.scope['user'].unique_id)
        if not user:
            return

        room = find_room_name(user, PPong_Rooms)
        if (user.game_state != MyUser.ONLINE or (room and not (len(room) == 4 and room[3] == 'Invited' and room[2][0].unique_id == user.unique_id and room[2][1] == 'TBR'))):
            self.accept()
            self.close()
            return

        #INVITE_PROCESS
        path = self.scope['path']
        if path.endswith('/'):
            path = path[:-1]
        parts = path.split('/')
        invited_id = None

        if len(parts) == 5 and parts[-2] == 'invite':
            invited_id = parts[-1]
            opponent =  sync__get_user(invited_id)

            if not opponent or (opponent and (opponent.game_state != MyUser.ONLINE and (find_room_name(user, PPong_Rooms) != find_room_name(opponent, PPong_Rooms)))):
                self.accept()
                self.close(code=3011)
                return
            
            self.accept()

            user = sync__get_user(user.unique_id)
            user.game_state = MyUser.IN_SEARCH
            user.save()

            cleaner(PPong_Rooms) 
            new_room_name = str(random_room_name()) 
            new_room = [new_room_name, [user, self], [opponent, 'TBR'], 'Invited']
            PPong_Rooms.append(new_room)
            
            self.send(json.dumps({
                'type': 'room_created',
                'role': 'p1',
                'my_id': user.unique_id,
                'room_name': new_room_name,
                'opponent_id': opponent.unique_id,
                'color': 'white',

                'user_name' : user.login,
                'opponent_name':opponent.login,

            }, default=str))

            return
        
        else:
            pass 

        self.accept()
        user = sync__get_user(user.unique_id)
        user.game_state = MyUser.IN_SEARCH
        user.save()
        
        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, PPong_Rooms)

    def receive(self, text_data):
        data = json.loads(text_data)
        pass

    def disconnect(self, close_code):
        if close_code == 1000:
            return

        user = self.scope['user']
        user = sync__get_user(user.unique_id)
        if not user:
            return

        room = find_room_name(user, PPong_Rooms)
        if (user.game_state == MyUser.IN_SEARCH):
            if room :
                remove_room(room[0], PPong_Rooms)
            user = sync__get_user(user.unique_id)
            user.game_state = MyUser.ONLINE
            user.save()
        elif (user.game_state == MyUser.IN_GAME and room and len(room) >= 4 and room[3] == 'Invited'):

            second_user = sync__get_user(room[2][0].unique_id)
            if second_user and second_user.game_state == MyUser.ONLINE:
                remove_room(room[0], PPong_Rooms)
                user = sync__get_user(user.unique_id)
                user.game_state = MyUser.ONLINE
                user.save()
            else:
                return
        elif (user.game_state == MyUser.IN_GAME and room):
            pass

connections_count = {}
class GameRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = await async_get_user(self.scope['user'].unique_id)
        if not user:
            return
        room = find_room_name(user, PPong_Rooms)

        if room:
            if (len(room) == 4 and room[3] == 'Invited'):
                path = self.scope['path'] 
                if path.endswith('/'):
                    path = path[:-1]
                parts = path.split('/')

                if len(parts) == 4 and parts[3] != room[0]:
                    await self.accept()
                    await self.close(code=4001)
                    return
                
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                connections_count[self.room_group_name] = connections_count.get(self.room_group_name, 0) + 1

                if connections_count[self.room_group_name] <= 2:
                    await self.accept()

                    user = await async_get_user(user.unique_id)
                    user.game_state = MyUser.IN_GAME
                    await sync_to_async(user.save)()
      
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )

                    if user.unique_id == room[2][0].unique_id:
                        data = {"type" : "match_found", "room_name" : room[0], "user_name" : user.login}
                        
                        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'broadcast_event',
                                'payload': data
                            }
                        )
                        
                else:
                    await self.accept()
                    await self.close(code=4001)

            elif (len(room) >= 1): 
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                connections_count[self.room_group_name] = connections_count.get(self.room_group_name, 0) + 1

                if connections_count[self.room_group_name] <= 2:
                    await self.accept()
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )
                else:
                    await self.accept()
                    await self.close(code=4001)
            else:
                await self.accept()
                await self.close(code=4001)
        else:
            await self.accept()
            await self.close(code=4001)        


    async def disconnect(self, close_code):

        if close_code == 1000:
            return

        user = await async_get_user(self.scope['user'].unique_id)
        if not user:
            return

        room = find_room_name(user, PPong_Rooms)
        if room:
            if (user.game_state == MyUser.IN_SEARCH):
                room = find_room_name(user, PPong_Rooms)
                if room :
                    remove_room(room[0], PPong_Rooms)

            elif (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                loser, winner = None, None
                if user.unique_id == room[1][0].unique_id:
                    loser =  await async_get_user(room[1][0].unique_id)
                    winner = await async_get_user(room[2][0].unique_id)

                elif user.unique_id == room[2][0].unique_id:
                    loser =  await async_get_user(room[2][0].unique_id)
                    winner = await async_get_user(room[1][0].unique_id)
                
                if (len(room) == 3 and loser and winner and (loser.game_state == MyUser.IN_GAME and winner.game_state == MyUser.IN_GAME) ) or (len(room) == 4 and room[3] == 'Invited'):
                    try:
                        loser_profile   = await get_profile(loser)
                        winner_profile  = await get_profile(winner)
                        if loser and winner:
                            if (loser_profile and winner_profile):
                                loser_profile.lose += 1
                                winner_profile.wins += 1
                                winner_profile.total_games += 1
                                loser_profile.total_games  += 1                    
                                await sync_to_async(loser_profile.save)()
                                await sync_to_async(winner_profile.save)()

                                if len(room) == 3 or (len(room) == 4  and room[3] != 'Ended' and room[3] != 'Forfait'):
                                    roomk = find_room_name(user, PPong_Rooms)
                                    if roomk and roomk[0] == room[0]:
                                        remove_room(room[0], PPong_Rooms)
                                        await create_game(
                                            type='PONG',
                                            user1=winner,
                                            user2=loser,
                                            winner=winner,
                                            loser=loser,
                                            score_p1=7,
                                            score_p2=0
                                        )
                                        data = {"type" : "Forfait"}
                                        await self.channel_layer.group_send(
                                            self.room_group_name,
                                            {
                                                'type': 'broadcast_event',
                                                'payload': data
                                            }
                                        )
                    except Exception as e:
                        pass

        try:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        except Exception as e:
            pass 

        cleaner(PPong_Rooms)
        user = await async_get_user(user.unique_id)
        user.game_state = MyUser.ONLINE 
        await sync_to_async(user.save)()

    async def receive(self, text_data):
        data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'broadcast_event',
                'payload': data
            }
        )

    async def broadcast_event(self, event):
        if event['payload'].get('type') == 'Game_end':
            user = self.scope['user']
            room = find_room_name(user, PPong_Rooms)
            if room:
                if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                    if (len(room) == 3) or (len(room) == 4 and room[3] == 'Invited'):
                        remove_room(room[0], PPong_Rooms)
                    elif (len(room) == 4 and room[3] == 'Invited'):
                        remove_room(room[0], PPong_Rooms)
                    user_id1 = event['payload']['paddle']['x']
                    user_id2 = event['payload']['paddle']['y']

                    user  = await async_get_user(user_id1)
                    user2 = await async_get_user(user_id2)
                    profile1 = await get_profile(user)
                    profile2 = await get_profile(user2)

                    score_1 = int(event['payload']['ball']['x'])
                    score_2 = int(event['payload']['ball']['y'])

                    if user and user2:
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
                            user1=user,
                            user2=user2,
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
        return None
    
@sync_to_async
def async_get_user(unique_id):
    return MyUser.objects.filter(unique_id=unique_id).first()

def sync__get_user(unique_id):
    return MyUser.objects.filter(unique_id=unique_id).first()

@sync_to_async
def create_game(type, user1, user2, winner, loser, score_p1, score_p2):
    if (score_p1 != score_p2):
        try:
            w = ProfileStatus.objects.get(id_user_fk=winner)
            l = ProfileStatus.objects.get(id_user_fk=loser)
            w.xp = w.xp+100
            l.xp = max(l.xp-50,0)
            w.level = w.xp/1000
            l.level = l.xp/1000
            w.save()
            l.save()
        except Exception as e :
            pass
    return Game.objects.create(
        type=type,
        user_p1=user1,
        user_p2=user2,
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
                    print("   => player :", room[_ + 1][0].login, "\t\tgame_state (not accurate):", room[_ + 1][0].game_state)
                else:
                    print("   => game_state  :", room[_ + 1])
                
    print("==> End Printing room names.\n\n")

def remove_room(room_name, Rooms):
    for i, room in enumerate(Rooms):
        if len(room) >= 1 and room_name == room[0]:
            Rooms.pop(i)



Chess_Rooms = []

class ApiChessConsumer(WebsocketConsumer):
    def connect(self):

        user = self.scope['user']
        user = sync__get_user(user.unique_id)
        if not user:
            return
        
        if (user.game_state != MyUser.ONLINE):
            self.accept()
            self.close(code=3019)
            return

        cleaner(Chess_Rooms)
        self.accept()
        user.game_state = MyUser.IN_SEARCH
        user.save()

        self.send(json.dumps({
            'type': 'connection_established',
            'my_id': str(user.unique_id),
            'message': f'ki rak b9it assadi9, {user.login}'
        }, default=str))

        get_or_create_room(user, self, Chess_Rooms)


    def receive(self, text_data):
        data = json.loads(text_data)
        pass

    def disconnect(self, close_code):
        if close_code == 1006 or close_code == 3019:
            return

        user = self.scope['user']
        user = sync__get_user(user.unique_id)
        if not user:
            return

        if (user.game_state == MyUser.IN_SEARCH):
            room = find_room_name(user, Chess_Rooms)
            if room :
                remove_room(room[0], Chess_Rooms) 
            user.game_state = MyUser.ONLINE 
            user.save()
        elif (user.game_state == MyUser.IN_GAME):
            pass




chess_connections_count = {}

class GameChessRoomConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        user = self.scope['user']

        user = await async_get_user(user.unique_id)
        if not user:
            return

        room = find_room_name(user, Chess_Rooms)

        if room:
            if (len(room) >= 1): 
                self.room_name = room[0]
                self.room_group_name = f"game_room_{self.room_name}"
                chess_connections_count[self.room_group_name] = chess_connections_count.get(self.room_group_name, 0) + 1

                if chess_connections_count[self.room_group_name] <= 2:
                    await self.channel_layer.group_add(
                        self.room_group_name,
                        self.channel_name
                    )
                    await self.accept()
                else:
                    await self.accept()
                    await self.close(code=4320)
        else:
            await self.accept()
            await self.close(code=4320)

    async def disconnect(self, close_code):

        if close_code == 1006 or close_code == 4320:
            return

        user = self.scope['user']

        user = await async_get_user(user.unique_id)
        if not user:
            return

        room = find_room_name(user, Chess_Rooms)
        if room:
            if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                user1 = await async_get_user(room[1][0].unique_id)
                user2 = await async_get_user(room[2][0].unique_id)

                if (user1.game_state == MyUser.IN_GAME and user2.game_state == MyUser.IN_GAME):
                    if user.unique_id == user1.unique_id:
                        loser  = user1
                        winner = user2 

                    elif user.unique_id == user2.unique_id:
                        loser  = user2 
                        winner = user1

                if len(room) == 3:
                    room.append('Forfait')

                    try:
                        winner_profile   =  await get_profile(loser)
                        loser_profile    =  await get_profile(winner)
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
                                    user1=winner,
                                    user2=loser,
                                    winner=winner,
                                    loser=loser,
                                    score_p1=1,
                                    score_p2=0
                                )
                            data = {"type" : "Forfait"}
                            await self.channel_layer.group_send(
                                self.room_group_name,
                                {
                                    'type': 'broadcast_event_chess',
                                    'payload': data
                                }
                            )
                    except Exception as e:
                        pass

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        user = await async_get_user(user.unique_id)
        user.game_state = MyUser.ONLINE
        await sync_to_async(user.save)()
        if chess_connections_count.get(self.room_group_name):
            chess_connections_count.pop(self.room_group_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'broadcast_event_chess',
                'payload': data
            }
        )

    async def broadcast_event_chess(self, event):
        if event['payload'].get('type') == 'Game_end':
            user = self.scope['user']

            room = find_room_name(user, Chess_Rooms)
            if room:
                if (len(room) == 3 or (len(room) == 4 and room[3] != 'Ended' and room[3] != 'Forfait')):
                    if (len(room) == 3):
                        room.append('Ended')
                    elif len(room) == 4 and room[3] != 'Invited':
                        room[3] = 'Ended'

                    user_id1 = event['payload']['p1_id']
                    user_id2 = event['payload']['p2_id']
                    score_1  = int(event['payload']['p1_score'])
                    score_2  = int(event['payload']['p2_score'])

                    user  = await async_get_user(user_id1)
                    user2 = await async_get_user(user_id2)
                    t_winner, t_loser = None, None

                    if user and user2:
                        if score_1 == score_2:
                            winner_profile = await get_profile(user)
                            loser_profile  = await get_profile(user2)

                            if (winner_profile and loser_profile):
                                winner_profile.total_games += 1                  
                                loser_profile.total_games += 1
                                
                                await sync_to_async(winner_profile.save)()
                                await sync_to_async(loser_profile.save)()

                                await create_game(
                                    type='CHESS',
                                    user1=user,
                                    user2=user2,
                                    winner=user,
                                    loser=user2,
                                    score_p1=0,
                                    score_p2=0
                                )

                        elif score_1 > score_2:
                            t_winner, t_loser = user, user2
                        elif score_1 < score_2:
                            t_winner, t_loser = user2, user

                        if (t_winner and t_loser):
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
                                    user1=t_winner,
                                    user2=t_loser,
                                    winner=t_winner,
                                    loser=t_loser,
                                    score_p1=score_1,
                                    score_p2=score_2
                                )

        
        if (str(event['payload'].get('my_id')) == str(self.scope['user'].unique_id)):
            return

        await self.send(json.dumps(event['payload']))
