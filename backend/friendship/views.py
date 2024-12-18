from django.http import HttpResponse
from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import FriendShip, FriendRequest, RelationShipStatus, BlockList
from .serializers import FriendshipSerializer, FriendRequestSerializer
from users.models import MyUser
from conversations.models import Message

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from conversations.models  import Channel
# # Create your views here.

class FriendRequestList(generics.ListAPIView):
	permission_classes = [AllowAny]
	serializer_class = FriendshipSerializer
	def get_sentedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all pending friend requests related to the user
		return FriendShip.objects
# # this need the user log in to define the proper behavios as in this case any of the 2 users they can redefine there friend ship with the other in both side
# # plus any user that new a friendship id can change other users friendship status
# class ListFriendRequests(generics.ListAPIView):
# 	permission_classes = [IsAuthenticated]
# 	serializer_class = FriendshipSerializer
# 	def get_sentedRequest(self):
# 		user_id = self.kwargs['user_id']
# 		# Get all pending friend requests related to the user
# 		return Friendship.objects.filter(user=user_id, status=RelationShipStatus.PENDING.value)

# 	def get_receivedRequest(self):
# 		user_id = self.kwargs['user_id']
# 		# Get all pending friend requests related to the user
# 		return Friendship.objects.filter(friend=user_id, status=RelationShipStatus.PENDING.value)

# 	def list(self, request, *args, **kwargs):
# 		user_id = self.kwargs['user_id']
# 		sentedRequest = self.get_sentedRequest()
# 		receivedRequest = self.get_receivedRequest()

# 		# Optionally filter received requests
# 		serializer1 = self.get_serializer(receivedRequest, many=True)
# 		serializer2 = self.get_serializer(sentedRequest, many=True)
# 		return Response({
# 			'user_id' : user_id,
# 			'sent_requests': serializer2.data,
# 			'received_requests': serializer1.data,
#         })

# class ListFriends(generics.ListAPIView):
# 	# permission_classes = [IsAuthenticated]
# 	serializer_class = FriendshipSerializer
# 	def get_sentedRequest(self):
# 		user_id = self.kwargs['user_id']
# 		# Get all pending friend requests related to the user
# 		return Friendship.objects.filter(user=user_id, status=RelationShipStatus.ACCEPTED.value)

# 	def get_receivedRequest(self):
# 		user_id = self.kwargs['user_id']
# 		# Get all ACCEPTED friend requests related to the user
# 		return Friendship.objects.filter(friend=user_id, status=RelationShipStatus.ACCEPTED.value)

# 	def list(self, request, *args, **kwargs):
# 		user_id = self.kwargs['user_id']
# 		sentedRequest = self.get_sentedRequest()
# 		receivedRequest = self.get_receivedRequest()

# 		# Optionally filter received requests
# 		serializer1 = self.get_serializer(receivedRequest, many=True)
# 		serializer2 = self.get_serializer(sentedRequest, many=True)
# 		return Response({
# 			'user_id' : user_id,
# 			'sent_requests': serializer2.data,
# 			'received_requests': serializer1.data,
# 		})
	
# class SendFriendRequest(APIView):
# 	permission_classes = [IsAuthenticated]
# 	def post(self,request, user_id, friend_id,**kwargs):
# 		try:
# 			user = MyUser.objects.get(id=user_id)
# 			friend = MyUser.objects.get(id=friend_id)
# 			friendship, created = Friendship.objects.get_or_create(user=user, friend=friend)
# 			if created:
# 				return Response({'message': 'Friend request sent'}, status=status.HTTP_201_CREATED)
# 			else:
# 				return Response({'message': 'Friend request was already sent'}, status=status.HTTP_200_OK)
# 		except MyUser.DoesNotExist as e:
# 			return Response({'message': str(e)}, status=status.HTTP_404_NOT_FOUND)


# class AcceptFriendRequest(APIView):
# 	permission_classes = [IsAuthenticated]
# 	def put(self,reuest, pk, **kwargs):
# 		friendship = Friendship.objects.get(id=pk)
# 		friendship2, created = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
# 		friendship.status = RelationShipStatus.ACCEPTED.value
# 		friendship2.status = RelationShipStatus.ACCEPTED.value
# 		friendship.save()
# 		friendship2.save()
# 		return Response({'message': 'Accept request sent'}, status=status.HTTP_200_OK)

# class BlockFriendRequest(APIView):
# 	permission_classes = [IsAuthenticated]
# 	def put(self, request,pk,**kwargs):
# 		friendship = Friendship.objects.get(id=pk)
# 		friendship2, created= Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
# 		friendship.status = RelationShipStatus.BLOCKED.value
# 		friendship2.status = RelationShipStatus.BLOCKED.value
# 		friendship.save()
# 		friendship2.save()
# 		return Response({'message': 'Block request sent'}, status=status.HTTP_200_OK)

# class DeclineFriendRequest(APIView):
# 	permission_classes = [IsAuthenticated]
# 	def put(self, request, pk,**kwargs):
# 		friendship = Friendship.objects.get(id=pk)
# 		friendship2 = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
# 		friendship.status = RelationShipStatus.DECLINED.value
# 		friendship2.status = RelationShipStatus.DECLINED.value
# 		friendship.save()
# 		friendship2.save()
# 		return Response({'message': 'Declinerequest sent'}, status=status.HTTP_200_OK)

# class DeleteFriendship(APIView):
# 	permission_classes = [IsAuthenticated]
# 	def delete(self, request, pk, **kwargs):
# 		friendship = Friendship.objects.get(id=pk)
# 		st = friendship.status
# 		friendship2, created = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
# 		friendship.delete()
# 		if created:
# 			friendship2.delete()
# 		return Response({'message': 'Delete friendship was done'}, status=status.HTTP_200_OK)

# get a friend request status
# @api_view(['GET'])
# def FriendRequestStatus(request, id):
# 	fr = 
#################################################################
## for fun ######################################################
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
			message = Message.objects.create(sender=friend_request.sender, id_channel_fk=channel, content=random_quote())
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
		return Response({'message': 'User '+_login+' in the Block List'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def UnBlockUser(request, _login):
	try:
		blocked_user = MyUser.objects.get(login=_login)
		user = request.user
		list = BlockList.objects.get(user=user)
		list.block_users.remove(blocked_user)
		return Response({'message': 'User is  Unblocked!'}, status=status.HTTP_200_OK)
	except:
		return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def UnFriendUser(request, _login):
	try:
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
	# try:
	# 	user = request.user
	# 	FriendRequests = FriendRequest.objects.filter(sender=user)

	# except:
	# 	return Response({'Error': 'Something went wrong?'}, status=status.HTTP_400_BAD_REQUEST)
