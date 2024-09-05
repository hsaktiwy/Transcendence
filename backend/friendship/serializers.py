from rest_framework import serializers
from .models import Friendship
from users.serializers import PublicUserSerializer
class FriendshipSerializer(serializers.ModelSerializer):
	user = PublicUserSerializer()
	friend = PublicUserSerializer()
	class Meta:
		model = Friendship
		fields = ['id', 'status', 'created_at', 'user', 'friend']