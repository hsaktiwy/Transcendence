from rest_framework import serializers
from .models import Message, Channel
from users.models import MyUser

class MessageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Message
		fields = ['id', 'sender',  'content']

	def validate(self, data):
		user = data['sender']
		channel = data['id_channel_fk']
		if not channel.users.filter(id=user.id).exists():
			raise serializers.ValidationError('User is not a member of the channel.')
		return data
	
class ChannelSerializer(serializers.ModelSerializer):
	class Meta:
		model = Channel
		fields = '__all__'
	
	def validate(self, data):
		if self.instance:
			# this will work if we are updating the instance
			print('Update Channel')
			if self.instance.users.count() >= 2:
				raise serializers.ValidationError('Channel can accept 2 users at most.')
		else:
			# this will work if we are creating the channel so then instance still not been created
			print('Post channel')
			users = data.get('users', [])
			print('users  : ', users)
			if users and len(users) > 2:
				raise serializers.ValidationError("Channel can accept 2 users at most.")
		return data

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = ['id','firstName', 'lastName','login',  'profile_pic']

class MessageSerializer2(serializers.ModelSerializer):
	sender = UserSerializer()
	class Meta:
		model = Message
		fields = ['id', 'sender',  'content']