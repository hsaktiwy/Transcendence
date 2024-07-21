from rest_framework import generics
from .serializers import MessageSerializer, ChannelSerializer
from .models import Message, Channel
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# Create your views here.

class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]
	queryset = Message.objects.all()
	serializer_class = MessageSerializer

class MessageAPICreate(generics.ListCreateAPIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]
	queryset = Message.objects.all()
	serializer_class = MessageSerializer

class ChannelRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer

class ChannelAPICreate(generics.ListCreateAPIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer
