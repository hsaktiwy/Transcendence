from rest_framework import generics
from .serializers import MessageSerializer, ChannelSerializer
from .models import Message, Channel
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Message.objects.all()
	serializer_class = MessageSerializer

class MessageAPICreate(generics.ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Message.objects.all()
	serializer_class = MessageSerializer

class ChannelRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer

class ChannelAPICreate(generics.ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer
