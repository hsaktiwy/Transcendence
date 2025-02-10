from rest_framework import generics
from .models import Notification, ProfileStatus, MyUser, Achievements
from .serializers import NotificationSerializer, ProfileStatusSerializer, RankProfileSerializer, AchievementsSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from users.serializers import PublicUserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import timedelta
from game.models import Game  # Replace with your actual model import path


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

# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# from .models import ProfileStatus, MyUser

@api_view(['GET'])
def get_Rank_User(request, uuid):
    try:
        user = get_object_or_404(MyUser, unique_id=uuid)

        profile_status = get_object_or_404(ProfileStatus, id_user_fk=user)

        xp = (profile_status.wins * 100)
        xp += (profile_status._wins * 50)
        xp -= profile_status.lose * 50
        xp -= profile_status._lose * 25
        if(xp < 0):
            xp = 0
        profile_status.level = xp / 1000
        profile_status.save()

        return Response({
            'user_id': str(user.unique_id),
            'wins': profile_status.wins,
            'xp': xp,
            'level': profile_status.level
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_top_rank(request):
    try:
        user = request.user  # Current user
        # Order profiles by level in descending order (higher level = higher rank)
        ranked_profiles = ProfileStatus.objects.all().order_by('-level')

        # Serialize profile data with ranks
        serialized_profiles = RankProfileSerializer(ranked_profiles, many=True)

        profiles_list = []
        for profile in serialized_profiles.data:
            try:
                # Fetch related user
                info_user = MyUser.objects.get(id=profile['id_user_fk'])
                serialized_user = PublicUserSerializer(info_user)

                # Combine user and profile data
                _update = {
                    "user": serialized_user.data,
                    "profile": profile
                }
                profiles_list.append(_update)
            except MyUser.DoesNotExist:
                continue  # Skip if user not found

        return Response({'profiles': profiles_list}, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
def get_line_chart(request, uuid):
    try:
        # Fetch the user based on the login provided
        user = MyUser.objects.get(unique_id=uuid)

        # Get the current date and time
        now = timezone.now()

        # Calculate the start date (35 days ago)
        start_date = now - timedelta(days=35)

        # Initialize a list to store the match counts for each week
        weekly_match_data = []

        # Loop through each week
        for week in range(5):
            # Calculate the start and end dates for the current week
            week_start = start_date + timedelta(days=week * 7)
            week_end = week_start + timedelta(days=7)

            # Filter matches for the current week involving the user
            matches = Game.objects.filter(
                time__gte=week_start,
                time__lt=week_end,
                winner__id=user.id,  # Assuming the MatchHistory model has a foreign key to the user
            )
            # Count matches for the current week
            weekly_match_data.append({
                "week_start": week_start.strftime("%Y-%m-%d"),
                "week_end": week_end.strftime("%Y-%m-%d"),
                "match_count": matches.count()
            })

        # Prepare response data
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
        user = get_object_or_404(MyUser, unique_id=uuid)
        profile_status = get_object_or_404(ProfileStatus, id_user_fk=user)

        # Get user achievements
        achievements = Achievements.objects.filter(id_user_fk=user)
        achievements_data = AchievementsSerializer(achievements, many=True).data

        return Response({
            'user_id': str(user.unique_id),
            'wins': profile_status.wins,
            'achievements': achievements_data
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)
