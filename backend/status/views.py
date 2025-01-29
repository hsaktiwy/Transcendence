from rest_framework import generics
from .models import Notification, ProfileStatus, MyUser
from .serializers import NotificationSerializer, ProfileStatusSerializer, RankProfileSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from users.serializers import PublicUserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view


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

