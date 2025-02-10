from rest_framework import generics, status
from .serializers import ChannelSerializer, UserSerializer, MessageSerializer
from .models import Message, Channel
from rest_framework.response import Response
from users.models import MyUser
from django.core.paginator import Paginator
from friendship.models import BlockList
from rest_framework.decorators import api_view
from django.db.models import Q

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
				conversation_status = 0
				new_messages = False
				packet_max_size = 0
				# check for invalide conversation
				user_list = channel.users.exclude(id=user.id)
				if (len(user_list) > 0):
					other_user = user_list[0]
					other_user_block_list = BlockList.objects.get(user=other_user)
					is_blocking = other_user_block_list.block_users.filter(id=user.id).exists()
					# check if one if the user is blocking the other one
					if is_blocking:
						conversation_status = 1
				if conversation_status == 0:
					# check if the other user is blocking our user
					user_block_list = BlockList.objects.get(user=user)
					is_blocking = user_block_list.block_users.filter(id=other_user.id).exists()
					if  is_blocking:
						conversation_status = 1
				if conversation_status == 0:
					messages = Message.objects.filter(id_channel_fk=channel.id).order_by('-timestamp')
					# first let creat the paginator object called paginator
					print(packetSize)
					paginator = Paginator(messages, packetSize)
					#page = 1
					packet_max_size = paginator.num_pages
					packet = paginator.page(1)

					# reverce the packet after recieving it
					packet = list(packet.object_list)[::-1]
					if len(packet) > 0:
						for message in packet:
							if message.sender!=user and message.isread == False:
								new_messages = True
								break
	
				MessagesSerialized = MessageSerializer(packet, many=True) if conversation_status == 0 else None
				users = channel.users.all()
				if len(users) < 2:
					return  Response({'Wala' : 'the users on this channel are less then 2 (probably one is deleted)'}, status=status.HTTP_400_BAD_REQUEST)
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
					'messages' : MessagesSerialized.data if MessagesSerialized is not None  else [],
					'LastUpdate' :  channel.last_update.strftime('%Y-%m-%d %H:%M:%S'),
					'last_packet': 1,
					'next_packet_number': (2 if paginator.num_pages - 1 > 0 else  1) if conversation_status == 0 else -1,
					'is_next_packet': (True if paginator.num_pages - 1 > 0 else False) if conversation_status == 0 else -1,
					'scrollTop': -1,
    				'scrollLeft': -1,
					'status': conversation_status,
					'new_message': int(new_messages),
					'packet_max_size': packet_max_size
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
			MessagesSerialized = MessageSerializer(packet, many=True)
			return Response({
				'messages' : MessagesSerialized.data,'last_packet': packetToAdd,
				'next_packet_number': packetToAdd + 1 if paginator.num_pages - packetToAdd > 0 else  packetToAdd,
				'is_next_packet': True if paginator.num_pages - packetToAdd > 0 else False
				}, status=status.HTTP_200_OK)
		except Exception as e:
			return  Response({'Wala' : str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_conversation(request, channelId, packetSize):
	try :
		user = request.user
		# extract the packet size
		channel = Channel.objects.get(Q(users__id=user.id) & Q(id=channelId))
		conv_data = {}
		if channel:
			conversation_status = 0
			new_messages = False
			packet_max_size = 0
			# check for invalide conversation
			user_list = channel.users.exclude(id=user.id)
			if (len(user_list) > 0):
				other_user = user_list[0]
				other_user_block_list = BlockList.objects.get(user=other_user)
				is_blocking = other_user_block_list.block_users.filter(id=user.id).exists()
				# check if one if the user is blocking the other one
				if is_blocking:
					conversation_status = 1
			if conversation_status == 0:
				# check if the other user is blocking our user
				user_block_list = BlockList.objects.get(user=user)
				is_blocking = user_block_list.block_users.filter(id=other_user.id).exists()
				if  is_blocking:
					conversation_status = 1
			if conversation_status == 0:
				messages = Message.objects.filter(id_channel_fk=channel.id).order_by('-timestamp')
				# first let creat the paginator object called paginator
				print(packetSize)
				paginator = Paginator(messages, packetSize)
				#page = 1
				packet_max_size = paginator.num_pages
				packet = paginator.page(1)

				# reverce the packet after recieving it
				print("--------------->before,", channel.id)
				packet = list(packet.object_list)[::-1]
				if len(packet) > 0:
					for message in packet:
						if message.sender!=user and message.isread == False:
							new_messages = True
							break
				print("--------------->Wala,", channel.id)
			MessagesSerialized = MessageSerializer(packet, many=True) if conversation_status == 0 else None
			users = channel.users.all()
			if len(users) < 2:
				return  Response({'Wala' : 'the users on this channel are less then 2 (probably one is deleted)'}, status=status.HTTP_400_BAD_REQUEST)
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
				'messages' : MessagesSerialized.data if MessagesSerialized is not None  else [],
				'LastUpdate' :  channel.last_update.strftime('%Y-%m-%d %H:%M:%S'),
				'last_packet': 1,
				'next_packet_number': (2 if paginator.num_pages - 1 > 0 else  1) if conversation_status == 0 else -1,
				'is_next_packet': (True if paginator.num_pages - 1 > 0 else False) if conversation_status == 0 else -1,
				'scrollTop': -1,
				'scrollLeft': -1,
				'status': conversation_status,
				'new_message': int(new_messages),
				'packet_max_size': packet_max_size
			}
			conv_data = consversation

		return Response({'conv':conv_data}, status=status.HTTP_200_OK)
	except Exception as e:
		return  Response({'Error' : str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Get_channel_id(request, uuid):
	try:
		if len(uuid) > 0:
			user = request.user
			friend = MyUser.objects.get(unique_id=uuid)
			channel = Channel.objects.filter(users=user).filter(users=friend)
			if len(channel) > 0:
				return Response({'channel_id': channel[0].id}, status=200)
			else:
				return  Response({'Error' : " Channel doesn't exist!"}, status=404)
		else:
			return  Response({'message' : "noting"}, status=status.HTTP_400_BAD_REQUEST)
	except Channel.DoesNotExist as e:
		return  Response({'Error' : " Channel doesn't exist!"}, status=404)
	except MyUser.DoesNotExist as e:
		return  Response({'Error' : " User doesn't exist!"}, status=404)
	except Exception as e:
		return  Response({'Error' : str(e)}, status=status.HTTP_400_BAD_REQUEST)