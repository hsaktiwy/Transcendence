from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Friendship, RelationShipStatus
from .serializers import FriendshipSerializer
from users.models import MyUser
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# this will need authentication
# class send_friend_request(generics.CreateAPIView):
# 	def post(self, request, *args, **kwargs):
# 		user = request.user
# 		friend = User.objects.get(id=request.data['friend_id'])
# 		friendship,created = Friendship.objects.get_or_create(user=user, friend=friend)
# 		if created:
# 			return HttpResponse('friend request sent')
# 		else:
# 			return HttpResponse('friend request was already sent')

# class accept_friend_request(generics.UpdateAPIView):
# 	def put(self, request, *args, **kwargs):
# 		user = request.user
# 		friendship = Friendship.objects.get(id=request.data['request_id'])
# 		if friendship.friend == user:
# 			friendship2,created = Friendship.objects.get_or_create(user=user, friend=friendship.user)
# 			friendship.status = RelationShipStatus.ACCEPTED
# 			friendship2.status = RelationShipStatus.ACCEPTED

# this need the user log in to define the proper behavios as in this case any of the 2 users they can redefine there friend ship with the other in both side
# plus any user that new a friendship id can change other users friendship status
class ListFriendRequests(generics.ListAPIView):
	permission_classes = [IsAuthenticated]
	serializer_class = FriendshipSerializer
	def get_sentedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all pending friend requests related to the user
		return Friendship.objects.filter(user=user_id, status=RelationShipStatus.PENDING.value)

	def get_receivedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all pending friend requests related to the user
		return Friendship.objects.filter(friend=user_id, status=RelationShipStatus.PENDING.value)

	def list(self, request, *args, **kwargs):
		user_id = self.kwargs['user_id']
		sentedRequest = self.get_sentedRequest()
		receivedRequest = self.get_receivedRequest()

		# Optionally filter received requests
		serializer1 = self.get_serializer(receivedRequest, many=True)
		serializer2 = self.get_serializer(sentedRequest, many=True)
		return Response({
			'user_id' : user_id,
			'sent_requests': serializer2.data,
			'received_requests': serializer1.data,
        })

class ListFriends(generics.ListAPIView):
	# permission_classes = [IsAuthenticated]
	serializer_class = FriendshipSerializer
	def get_sentedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all pending friend requests related to the user
		return Friendship.objects.filter(user=user_id, status=RelationShipStatus.ACCEPTED.value)

	def get_receivedRequest(self):
		user_id = self.kwargs['user_id']
		# Get all ACCEPTED friend requests related to the user
		return Friendship.objects.filter(friend=user_id, status=RelationShipStatus.ACCEPTED.value)

	def list(self, request, *args, **kwargs):
		user_id = self.kwargs['user_id']
		sentedRequest = self.get_sentedRequest()
		receivedRequest = self.get_receivedRequest()

		# Optionally filter received requests
		serializer1 = self.get_serializer(receivedRequest, many=True)
		serializer2 = self.get_serializer(sentedRequest, many=True)
		return Response({
			'user_id' : user_id,
			'sent_requests': serializer2.data,
			'received_requests': serializer1.data,
		})
	
class SendFriendRequest(APIView):
	permission_classes = [IsAuthenticated]
	def post(self,request, user_id, friend_id,**kwargs):
		try:
			user = MyUser.objects.get(id=user_id)
			friend = MyUser.objects.get(id=friend_id)
			friendship, created = Friendship.objects.get_or_create(user=user, friend=friend)
			if created:
				return Response({'message': 'Friend request sent'}, status=status.HTTP_201_CREATED)
			else:
				return Response({'message': 'Friend request was already sent'}, status=status.HTTP_200_OK)
		except MyUser.DoesNotExist as e:
			return Response({'message': str(e)}, status=status.HTTP_404_NOT_FOUND)


class AcceptFriendRequest(APIView):
	permission_classes = [IsAuthenticated]
	def put(self,reuest, pk, **kwargs):
		friendship = Friendship.objects.get(id=pk)
		friendship2, created = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
		friendship.status = RelationShipStatus.ACCEPTED.value
		friendship2.status = RelationShipStatus.ACCEPTED.value
		friendship.save()
		friendship2.save()
		return Response({'message': 'Accept request sent'}, status=status.HTTP_200_OK)

class BlockFriendRequest(APIView):
	permission_classes = [IsAuthenticated]
	def put(self, request,pk,**kwargs):
		friendship = Friendship.objects.get(id=pk)
		friendship2, created= Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
		friendship.status = RelationShipStatus.BLOCKED.value
		friendship2.status = RelationShipStatus.BLOCKED.value
		friendship.save()
		friendship2.save()
		return Response({'message': 'Block request sent'}, status=status.HTTP_200_OK)

class DeclineFriendRequest(APIView):
	permission_classes = [IsAuthenticated]
	def put(self, request, pk,**kwargs):
		friendship = Friendship.objects.get(id=pk)
		friendship2 = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
		friendship.status = RelationShipStatus.DECLINED.value
		friendship2.status = RelationShipStatus.DECLINED.value
		friendship.save()
		friendship2.save()
		return Response({'message': 'Declinerequest sent'}, status=status.HTTP_200_OK)

class DeleteFriendship(APIView):
	permission_classes = [IsAuthenticated]
	def delete(self, request, pk, **kwargs):
		friendship = Friendship.objects.get(id=pk)
		st = friendship.status
		friendship2, created = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
		friendship.delete()
		if created:
			friendship2.delete()
		return Response({'message': 'Delete friendship was done'}, status=status.HTTP_200_OK)