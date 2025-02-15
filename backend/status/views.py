from rest_framework import generics
from .models import Notification, ProfileStatus, MyUser
from .serializers import NotificationSerializer, ProfileStatusSerializer, RankProfileSerializer
from rest_framework.permissions import IsAuthenticated
from users.serializers import PublicUserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import timedelta
from game.models import Game
from django.shortcuts import get_object_or_404
from django.db.models import Q


# Create your views here.
class NotificationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Notification.objects.all()
	serializer_class = NotificationSerializer

class NotificationAPICreate(generics.ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Notification.objects.all()
	serializer_class = NotificationSerializer

class ProfileStatusRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = ProfileStatus.objects.all()
	serializer_class = ProfileStatusSerializer

class ProfileStatusAPICreate(generics.ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = ProfileStatus.objects.all()
	serializer_class = ProfileStatusSerializer



@api_view(['GET'])
def get_Win_Lose(request,uuid):
    try:
        # euser = request.user
        user = MyUser.objects.get(unique_id=uuid)
        profile = ProfileStatus.objects.get(id_user_fk=user)
        return Response({'wins' : profile.wins, 'lose' : profile.lose, '_wins' : profile._wins, '_lose' : profile._lose }, status=200)
    except:
        return Response({'error': 'somthing went wrong'}, status=400)





@api_view(['GET'])
def get_Rank_User(request, uuid):
    try:
        user = MyUser.objects.get(unique_id=uuid)
        profile_status = get_object_or_404(ProfileStatus, id_user_fk=user)

        last_match = Game.objects.filter(Q(user_p1=user) | Q(user_p2=user)).order_by('-time').first()

        if not last_match:
            return Response({'error': 'No matches found'}, status=400)

        if profile_status.last_match_id == last_match.id:
            return Response({  
                'user_id': str(user.unique_id),
                'xp': profile_status.xp,
                'level': profile_status.level
            }, status=200)

        match (last_match.winner == user, last_match.type):
            case (True, 'PONG'):
                profile_status.xp += 100
            case (True, 'CHESS'):
                profile_status.xp += 50
            case (False, 'PONG'):
                profile_status.xp -= 50
            case _:
                profile_status.xp -= 25



        profile_status.xp = max(profile_status.xp, 0)
        profile_status.level = profile_status.xp / 1000

        profile_status.last_match_id = last_match.id
        profile_status.save(update_fields=['xp', 'level', 'last_match_id'])

        return Response({
            'user_id': str(user.unique_id),
            'xp': profile_status.xp,
            'level': profile_status.level
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['GET'])
def get_top_rank(request):
    try:
        user = request.user
        ranked_profiles = ProfileStatus.objects.all().order_by('-level')

        serialized_profiles = RankProfileSerializer(ranked_profiles, many=True)\
        
        if not ranked_profiles.exists():
            return Response({'message': 'No ranked profiles found'}, status=404)
        profiles_list = []
        for profile in serialized_profiles.data:
            try:
                info_user = MyUser.objects.get(id=profile['id_user_fk'])
                serialized_user = PublicUserSerializer(info_user)
                _update = {
                    "user": serialized_user.data,
                    "profile": profile
                }
                profiles_list.append(_update)
            except MyUser.DoesNotExist:
                continue 

        return Response({'profiles': profiles_list}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_line_chart(request, uuid):
    try:
        user = MyUser.objects.get(unique_id=uuid)

        now = timezone.now()

        start_date = now - timedelta(days=35)

        weekly_match_data = []

        for week in range(5):
            week_start = start_date + timedelta(days=week * 7)
            week_end = week_start + timedelta(days=7)

            # Filter matches for the current week involving the user
            matches = Game.objects.filter(
                time__gte=week_start,
                time__lt=week_end,
                winner__id=user.id,  
            )
            # Count matches for the current week
            weekly_match_data.append({
                "week_start": week_start.strftime("%Y-%m-%d"),
                "week_end": week_end.strftime("%Y-%m-%d"),
                "match_count": matches.count()
            })

        data = {
            "user": user.login,
            "weekly_match_data": weekly_match_data
        }

        return Response(data, status=200)

    except MyUser.DoesNotExist:
        return Response({'error': f"User with uuid '{uuid}' does not exist."}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)



@api_view(['GET'])
def get_achievements(request, uuid):
    try:

        # last_match = Game.objects.filter(Q(user_p1=user) | Q(user_p2=user)).order_by('-time')[:5]
        user = get_object_or_404(MyUser, unique_id=uuid)
        profile_status = get_object_or_404(ProfileStatus, id_user_fk=user)
        last_five_matches = Game.objects.filter(
            Q(user_p1=user) | Q(user_p2=user),
            type='PONG'
        ).order_by('-time')[:5]

        # Check if the user won all last five matches
        print("Last five matches ->>>>>>>>>>>>>")
        for match in last_five_matches:
            print(f"Match ID: {match.id}, Winner: {match.winner}, Time: {match.time}, Type: {match.type}")
        all_wins = len(last_five_matches) == 5 and all(match.winner == user for match in last_five_matches)

        Achievements_Meta = [
            {
                "type": "FIRST_MATCH",
                "description": "Win your first match",
                "title": "First match",
                "game_numbers": 1,
                "icon": "firstPaddle"
            },
            {
                "type": "WIN_STREAK",
                "description": "Win 5 matches streak",
                "title": "5 wins streak",
                "game_numbers": 5,
                "achieved": all_wins,  # Add flag if achieved
                "icon": "streak"
            },
            {
                "type": "BRONZE",
                "description": "win 5 matches",
                "title": "Bronze",
                "game_numbers": 5,
                "icon": "bronze"
            },
            {
                "type": "SILVER",
                "description": "win 15 matches",
                "title": "Silver",
                "game_numbers": 15,
                "icon": "silver"
            },
            {
                "type": "GOLD",
                "description": "win 25 matches",
                "title": "Gold",
                "game_numbers": 25,
                "icon": "gold"
            },
            {
                "type": "PLATINUM",
                "description": "win 35 matches",
                "title": "Platinum",
                "game_numbers": 35,
                "icon": "platinum"
            },
            {
                "type": "LEGEND",
                "description": "win 50 matches",
                "title": "Legend",
                "game_numbers": 50,
                "icon": "legend"
            }
        ]   
 
        return Response({
            'user_id': str(user.unique_id),
            'wins': profile_status.wins,
            'achievements': Achievements_Meta 
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)