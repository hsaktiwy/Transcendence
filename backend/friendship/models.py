from django.db import models
from enum import Enum
from users.models import MyUser
# Create your models here.
class RelationShipStatus(Enum):
	PENDING = 'pending'
	ACCEPTED = 'accepted'
	DECLINED = 'declined'
	BLOCKED = 'blocked'
class Friendship(models.Model):
	user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='friendship')
	friend = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='friends')
	status = models.CharField(max_length=100,
                           choices=[(tag.value, tag.name) for tag in RelationShipStatus],
                           default=RelationShipStatus.PENDING.value)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		unique_together = ('user', 'friend')
		indexes = [models.Index(fields=['user', 'friend'])]

	def __str__(self):
		return self.user.login + " - " + self.friend.login + " - " + self.status

# class FriendList(models.Model):
# 	user = models.OneToOneField(MyUser, on_delete=models.CASCADE, related_name='user')
# 	friend_list = models.OneToOneField(M)