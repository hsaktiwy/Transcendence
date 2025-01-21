from django.http import HttpResponse
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import FriendShip, FriendRequest, RelationShipStatus, BlockList
from .serializers import FriendshipSerializer, FriendRequestSerializer, BlockListSerializer
from users.models import MyUser
from conversations.models import Message

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from conversations.models  import Channel
from users.serializers import PublicUserSerializer
# # Create your views here.

class FriendRequestList(generics.ListAPIView):
	permission_classes = [AllowAny]
	serializer_class = FriendshipSerializer
	def get_sentedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all pending friend requests related to the user
		return FriendShip.objects

import random

# Jhin and Jinx quotes
jhin_quotes = [
    "Art requires a certain... cruelty.",
    "In carnage, I bloom, like a flower in the dawn.",
    "I will make you beautiful.",
    "Behind every mask... is another mask."
]

jinx_quotes = [
    "Pow! Ha ha ha!",
    "I'm crazy! Got a doctor's note.",
    "Rules are made to be broken... like buildings! Or people!",
    "Time to put on my dancing shoes!"
]

# Randomize between Jhin or Jinx, then select a random quote
def random_quote():
    character = random.choice(["Jhin", "Jinx"])
    if character == "Jhin":
        quote = random.choice(jhin_quotes)
    else:
        quote = random.choice(jinx_quotes)

    return f"{character} says: \"{quote}\""
##################################################################

@api_view(['GET'])
def AcceptFriendRequest(request, id):
	try:
		friend_request = FriendRequest.objects.get(id=id)
		list1, create = BlockList.objects.get_or_create(user=friend_request.sender)
		check1 = list1.block_users.filter(id=friend_request.receiver.id).exists()
		list2, create = BlockList.objects.get_or_create(user=friend_request.receiver)
		check2 = list2.block_users.filter(id=friend_request.sender.id).exists()

		if check1 or check2:
			friend_request.delete()
			return Response({'message': 'You are Blocked!'}, status=403)
		if friend_request.status == RelationShipStatus.ACCEPTED.value:
			return Response({'message': 'All ready Accepted'}, status=status.HTTP_200_OK)
		friend_request.status = RelationShipStatus.ACCEPTED.value
		friend_request.save()
		friendship, created = FriendShip.objects.get_or_create(user=friend_request.sender, friend=friend_request.receiver)
		exist = Channel.objects.filter(users=friend_request.sender).filter(users=friend_request.receiver).exists()
		if exist:
			return Response({'message': 'All ready Exist a channel between Both users'}, status=status.HTTP_200_OK)
		else:
			channel = Channel.objects.create()
			channel.users.add(friend_request.sender)
			channel.users.add(friend_request.receiver)
			# message = Message.objects.create(sender=friend_request.sender, id_channel_fk=channel, content=random_quote())
		return Response({'message': 'Accept request sent'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def BlockUser(request, _login):
	try:
		blocked_user = MyUser.objects.get(login=_login)
		myuser = request.user
		list, create = BlockList.objects.get_or_create(user=myuser)
		check = list.block_users.filter(id=blocked_user.id).exists()
		if (not check):
			list.block_users.add(blocked_user)
		return Response({'message': 'User '+_login+' in the Block List', 'status': 'blocked'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def UnBlockUser(request, _login):
	try:
		blocked_user = MyUser.objects.get(login=_login)
		user = request.user
		list = BlockList.objects.get(user=user)
		list.block_users.remove(blocked_user)
		return Response({'message': 'User is  Unblocked!','status': 'unblocked'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def UnFriendUser(request, _login):
	try:
		# intented solution you can postman this even whne you are blocked (my logic my rules contact hsaktiwy )
		friend = MyUser.objects.get(login=_login)
		myuser = request.user
		friendship = FriendShip.objects.filter((Q(user=myuser) & Q(friend=friend)) | (Q(user=friend) & Q(friend=myuser)))
		f_request = FriendRequest.objects.filter((Q(sender=myuser) & Q(receiver=friend)) | (Q(sender=friend) & Q(receiver=myuser)))
		if len(friendship) > 0:
			friendship.first().delete()
		else:
			return Response({'mesasge': 'No friendship was found with '+_login+"!"}, status=status.HTTP_200_OK)
		if len(f_request) > 0:
			f_request.first().delete()
		return Response({'mesasge': 'Done'}, status=status.HTTP_200_OK)
	except MyUser.DoesNotExist:
		return Response({'mesasge': f'{_login} does not exist'}, status=404)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def isBlocked(request, _login):
	try:
		user = request.user
		otheruser = MyUser.objects.get(login=_login)
		blocklist = BlockList.objects.get(user=user)
		isblocked = blocklist.block_users.filter(id=otheruser.id).exists()
		if isblocked:
			return Response({'status': True}, status=status.HTTP_200_OK)
		else:
			return Response({'status': False}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def isFriend(request, _login):
	try:
		user = request.user
		otheruser = MyUser.objects.get(login=_login)
		friendship_exists = FriendShip.objects.filter(Q(user=user, friend=otheruser) | Q(user=otheruser, friend=user)).exists()
		if friendship_exists:
			return Response({'status': True}, status=status.HTTP_200_OK)
		else:
			return Response({'status': False}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def FriendRequestStatus(request, _login):
	try:
		myuser = request.user
		friend = MyUser.objects.get(login=_login)
		friendrequest = FriendRequest.objects.filter((Q(sender=myuser) & Q(receiver=friend)) | (Q(sender=friend) & Q(receiver=myuser)))
		if len(friendrequest) > 0:
			return Response({'status': friendrequest.first().status, 'sender' : friendrequest.first().sender == myuser, 'friend_req_id' : friendrequest.first().id}, status=status.HTTP_200_OK)
		else:
			return Response({'status': 'None'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def CancelFriendRequest(request, id):
	try:
		myuser = request.user
		friendrequest = FriendRequest.objects.filter(id=id)
		if len(friendrequest) > 0:
			friendrequest.first().delete()
		return Response({'status': 'Done'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)
# class FriendRequestSentList(generics.ListAPIView):
#     serializer_class = FriendRequestSerializer
#     def get_queryset(self):
#         user=self.request.user
#         return FriendRequest.objects.filter(sender=user, status='pending')

# class FriendRequestReceivedList(generics.ListAPIView):
#     serializer_class = FriendRequestSerializer
#     def get_queryset(self):
#         user=self.request.user
#         return FriendRequest.objects.filter(receiver=user, status='pending')
@api_view(['GET'])
def FriendRequestReceivedList(request):
	try:
		user=request.user
		list = FriendRequest.objects.filter(receiver=user, status='pending')
		serialized_data = FriendRequestSerializer(list, many=True)
		return Response(serialized_data.data, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({'Error':str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def FriendRequestSentList(request):
	try:
		user=request.user
		list = FriendRequest.objects.filter(sender=user, status='pending')
		serialized_data = FriendRequestSerializer(list, many=True)
		return Response(serialized_data.data, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({'Error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def FriendsList(request):
	try:
		user=request.user
		# list = FriendRequest.objects.filter(Q(sender=user, status='accepted'))
		list_s = FriendRequest.objects.filter(Q(sender=user, status='accepted'))
		array = []
		for s in list_s:
			array.append(s.receiver)
		list_r = FriendRequest.objects.filter(Q(receiver=user, status='accepted'))
		for s in list_r:
			array.append(s.sender)
		serialized_data = PublicUserSerializer(array, many=True)
		return Response(serialized_data.data, status=status.HTTP_200_OK)
	except Exception as e:
		return Response({'Error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
	# try:
	# 	user = request.user
	# 	FriendRequests = FriendRequest.objects.filter(sender=user)

	# except:
	# 	return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetBlockList(request):
	print("allo w9")
	try:
		user= request.user
		block_list = BlockList.objects.filter(user=user)
		serialized_data = BlockListSerializer(block_list, many=True)
		print(serialized_data.data[0])
		return Response(serialized_data.data[0].get('block_users'), status=status.HTTP_200_OK)
	except BlockList.DoesNotExist:
		return Response({'Error':'user does not exist'}, status=404)
	except Exception as e:
		print(e)
		return Response({'Error':str(e)}, status=status.HTTP_400_BAD_REQUEST)
		
		