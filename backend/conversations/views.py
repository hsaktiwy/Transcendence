from rest_framework import generics, status
from .serializers import MessageSerializer, ChannelSerializer, UserSerializer, MessageSerializer2
from .models import Message, Channel
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from users.models import MyUser
from django.core.paginator import Paginator
import json
# Create your views here.

class MessageRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Message.objects.all()
	serializer_class = MessageSerializer

class MessageAPICreate(generics.ListCreateAPIView):
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
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer

class ChannelAPICreate(generics.ListCreateAPIView):
	queryset = Channel.objects.all()
	serializer_class = ChannelSerializer

class ConversationAPIVIEW(generics.RetrieveAPIView):
	serializer_class = ChannelSerializer

	def get(self, request, packetSize,*args, **kwargs):
		# we will access to the channels that are related to our user,
		# then retreave all conversation and build a json and return it to the user
		try :
			user = request.user
			# extract the packet size
			channels = Channel.objects.filter(users__id=user.id).order_by('-last_update')
			consversations = []
			for channel in channels:
				messages = Message.objects.filter(id_channel_fk=channel.id).order_by('-timestamp')
				# first let creat the paginator object called paginator
				print(packetSize)
				paginator = Paginator(messages, packetSize)
				#page = 1
				packet = paginator.page(1)
				# reverce the packet after recieving it
				packet = list(packet.object_list)[::-1]
				MessagesSerialized = MessageSerializer2(packet, many=True)
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
					'LastUpdate' :  channel.last_update.strftime('%Y-%m-%d %H:%M:%S'),
					'last_packet': 1,
					'next_packet_number': 2 if paginator.num_pages - 1 > 0 else  1,
					'is_next_packet': True if paginator.num_pages - 1 > 0 else False,
					'scrollTop': -1,
    				'scrollLeft': -1
				}
				consversations.append(consversation)

			return Response({'conversations' : consversations}, status=status.HTTP_200_OK)
		except Exception as e:
			return  Response({'Wala' : str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ConversationUpdateAPIVIEW(generics.RetrieveAPIView):
	serializer_class = ChannelSerializer

	def get(self, request, channelId,packetSize, packetToAdd,*args, **kwargs):
		# we will access to the channels that are related to our user,
		# then retreave all conversation and build a json and return it to the user
		try :
			messages = Message.objects.filter(id_channel_fk=channelId).order_by('-timestamp')
			# first let creat the paginator object called paginator
			print(packetSize)
			paginator = Paginator(messages, packetSize)
			#page = 1
			packet = paginator.page(packetToAdd)
			# reverce the packet after recieving it
			packet = list(packet.object_list)[::-1]
			MessagesSerialized = MessageSerializer2(packet, many=True)
			return Response({
				'messages' : MessagesSerialized.data,'last_packet': packetToAdd,
				'next_packet_number': packetToAdd + 1 if paginator.num_pages - packetToAdd > 0 else  packetToAdd,
				'is_next_packet': True if paginator.num_pages - packetToAdd > 0 else False
				}, status=status.HTTP_200_OK)
		except Exception as e:
			return  Response({'Wala' : str(e)}, status=status.HTTP_400_BAD_REQUEST)