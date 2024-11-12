from rest_framework import serializers
from .models import FriendShip, FriendRequest, BlockList
from users.serializers import PublicUserSerializer

class FriendshipSerializer(serializers.ModelSerializer):
	sender = PublicUserSerializer()
	receiver = PublicUserSerializer()
	class Meta:
		model = FriendShip
		fields = ['id',  'user', 'friend', 'blocked_by', 'created_at']

class FriendRequestSerializer(serializers.ModelSerializer):
	sender = PublicUserSerializer()
	receiver = PublicUserSerializer()
	class Meta:
		model = FriendRequest
		fields = ['id',  'sender', 'receiver', 'status', 'created_at']

class BlockListSerializer(serializers.ModelSerializer):
	class Meta:
		model = BlockList
		fields = ['id', 'user', 'block_users']