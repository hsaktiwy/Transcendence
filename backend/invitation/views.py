from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GameInvitation, User

# Create your views here.
class SendGameInvitation(APIView):
	def post(self,request, sender_id, receiver_id,**kwargs):
		sender = User.objects.get(id=sender_id)
		receiver = User.objects.get(id=receiver_id)
		invitation, created = GameInvitation.objects.get_or_create(user_sender=sender, user_receiver=receiver)
		if created:
			return Response({'message': 'Game Invitation request sent'}, status=status.HTTP_201_CREATED)
		else:
			return Response({'message': 'Game Invitation request was already sent'}, status=status.HTTP_200_OK)

# class AcceptFriendRequest(APIView):
# 	def put(self,reuest, pk, **kwargs):
# 		friendship = Friendship.objects.get(id=pk)
# 		friendship2, created = Friendship.objects.get_or_create(user=friendship.friend, friend=friendship.user)
# 		friendship.status = RelationShipStatus.ACCEPTED.value
# 		friendship2.status = RelationShipStatus.ACCEPTED.value
# 		friendship.save()
# 		friendship2.save()
# 		return Response({'message': 'Accept request sent'}, status=status.HTTP_200_OK)