from rest_framework import serializers
from .models import Friendship
from users.serializers import UserSerializer
class FriendshipSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	friend = UserSerializer()
	class Meta:
		model = Friendship
		fields = ['id', 'status', 'created_at', 'user', 'friend']