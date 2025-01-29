from rest_framework import generics
from .models import Notification, ProfileStatus, MyUser
from .serializers import NotificationSerializer, ProfileStatusSerializer, RankProfileSerializer
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
def get_Win_Lose(request,_login):
    try:
        # euser = request.user
        user = MyUser.objects.get(login=_login)
        profile = ProfileStatus.objects.get(id_user_fk=user)
        return Response({'wins' : profile.wins, 'lose' : profile.lose, '_wins' : profile._wins, '_lose' : profile._lose }, status=200)
    except:
        return Response({'error': 'somthing went wrong'}, status=400)


@api_view(['GET'])
def get_top_rank(request):
    try:
        user = request.user  # Current user
        ranks = ProfileStatus.objects.all().order_by('rank')
        packets_size = 10
        page_number = 1 # Get the page number from query params
        
        paginator = Paginator(ranks, packets_size)
        page = paginator.page(page_number)
        serialized_page = RankProfileSerializer(page.object_list, many=True)
        profiles_list = []

        for profile in serialized_page.data:
            # Fetch related user
            info_user = MyUser.objects.get(id=profile['id_user_fk'])
            serialized_user = PublicUserSerializer(info_user)

            # Combine user and profile data
            _update = {
                "user": serialized_user.data,
                "profile": profile
            }
            profiles_list.append(_update)
        return Response({'profiles': profiles_list}, status=200)
    except Exception as e:
          return Response({'error': str(e)}, status = 400)

@api_view(['GET'])
def get_line_chart(request, _login):
    try:
        # Fetch the user based on the login provided
        user = MyUser.objects.get(login=_login)

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
        return Response({'error': f"User with login '{_login}' does not exist."}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)