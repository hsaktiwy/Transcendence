from rest_framework import generics
from .models import Notification, ProfileStatus
from .serializers import NotificationSerializer, ProfileStatusSerializer
from rest_framework.permissions import IsAuthenticated

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