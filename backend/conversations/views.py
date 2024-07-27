from rest_framework import generics, status
from .serializers import MessageSerializer, ChannelSerializer, UserSerializer, MessageSerializer2
from .models import Message, Channel
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from users.models import MyUser

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

	def perform_create(self, serializer):
		# Save the new message
		message = serializer.save()
		
		# Update the related channel's last_update field
		try:
			user = MyUser.objects.get(id=message.sender.id)
		except MyUser.DoesNotExist:
			raise Response({'Error' : 'Sender not found'}, status=status.HTTP_400_BAD_REQUEST)

		try:
			channel = Channel.objects.get(id=message.id_channel_fk.id)
		except Channel.DoesNotExist:
			raise Response({'Error' : 'channel not found'}, status=status.HTTP_400_BAD_REQUEST)


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

class ConversationAPIVIEW(generics.RetrieveAPIView):
	authentication_classes = [SessionAuthentication, BasicAuthentication]
	permission_classes = [IsAuthenticated]
	serializer_class = ChannelSerializer

	def get(self, request, *args, **kwargs):
		# we will access to the channels that are related to our user,
		# then retreave all conversation and build a json and return it to the user
		user = request.user
		channels = Channel.objects.filter(users__id=user.id)
		consversations = []
		for channel in channels:
			messages = Message.objects.filter(id_channel_fk=channel.id)
			MessagesSerialized = MessageSerializer2(messages, many=True)
			users = channel.users.all()
			UserSerialized = UserSerializer(users, many=True)

			if UserSerialized.data[0]['id'] == user.id:
				user1 = UserSerialized.data[0]
				user2 = UserSerialized.data[1]
			else:
				user1 = UserSerialized.data[1]
				user2 = UserSerialized.data[0]
			
			consversation={
				'channelId' : channel.id,
				'user1' : user1,
				'user2' : user2,
				'messages' : MessagesSerialized.data,
				'LastUpdate' :  channel.last_update.strftime('%Y-%m-%d %H:%M:%S')
			}
			consversations.append(consversation)

		return Response({'conversations' : consversations}, status=status.HTTP_200_OK)