from rest_framework import serializers
from .models import FriendShip, FriendRequest, BlockList
from users.serializers import PublicUserSerializer

class FriendRequestSerializer(serializers.ModelSerializer):
	sender = PublicUserSerializer()
	receiver = PublicUserSerializer()
	class Meta:
		model = FriendRequest
		fields = ['id',  'sender', 'receiver', 'status', 'created_at']


class BlockListSerializer(serializers.ModelSerializer):
	block_users = PublicUserSerializer(many=True)
	class Meta:
		model = BlockList
		fields = ['block_users']