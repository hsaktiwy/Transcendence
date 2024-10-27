from rest_framework import serializers
from .models import FriendShip, FriendRequest, BlockList
from users.serializers import UserSerializer

class FriendshipSerializer(serializers.ModelSerializer):
	sender = UserSerializer()
	receiver = UserSerializer()
	class Meta:
		model = FriendShip
		fields = ['id',  'user', 'friend', 'blocked_by', 'created_at']

class FriendRequestSerializer(serializers.ModelSerializer):
	sender = UserSerializer()
	receiver = UserSerializer()
	class Meta:
		model = FriendRequest
		fields = ['id',  'sender', 'receiver', 'status', 'created_at']

class BlockListSerializer(serializers.ModelSerializer):
	class Meta:
		model = BlockList
		fields = ['id', 'user', 'block_users']