from rest_framework import serializers
from .models import Message, Channel
from users.models import MyUser

class ChannelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Channel
		fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = ['id', 'unique_id' ,'login', 'email', 'firstName', 'lastName', 'state', 'last_visit', 'profile_pic', 'CoverProfile']

class MessageSerializer(serializers.ModelSerializer):
	sender = UserSerializer()
	class Meta:
		model = Message
		fields = ['id', 'sender',  'content', 'isread', 'timestamp']