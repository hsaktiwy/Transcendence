from rest_framework import serializers
from .models import Message, channel

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = '__all__'
class ChannelSerializer(serializers.ModelSerializer):
	class Meta:
		model = channel
		fields = '__all__'