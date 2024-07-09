from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GameInvitation, User, GameInvitationStatus
from .serializers import GameInvitationSerializer
# Create your views here.
class ListGameInvitation(generics.ListAPIView):
      serializer_class = GameInvitationSerializer
      queryset = GameInvitation.objects.all()
      
class SendGameInvitation(APIView):
	def post(self,request, sender_id, receiver_id,**kwargs):
		sender = User.objects.get(id=sender_id)
		receiver = User.objects.get(id=receiver_id)
		invitation, created = GameInvitation.objects.get_or_create(user_sender=sender, user_receiver=receiver)
		if created:
			return Response({'message': 'Game Invitation request sent'}, status=status.HTTP_201_CREATED)
		else:
			return Response({'message': 'Game Invitation request was already sent'}, status=status.HTTP_200_OK)

class ChangeGameInvitationStatus(APIView):
    def put(self,reuest, pk, Status, **kwargs):
        try:
            invitation = GameInvitation.objects.get(id=pk)
            invitation.status = GameInvitationStatus[Status.upper()].value
            invitation.save()
            return Response({'message': 'Accept request sent'}, status=status.HTTP_200_OK)
        except GameInvitation.DoesNotExist:
            return Response({'message': 'Invitation Not Found'}, status=status.HTTP_404_OK)
        except KeyError as e:
            return Response({"Error": "Somthing Went Wrong : " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)