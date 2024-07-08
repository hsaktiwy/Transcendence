from django.db import models
from enum import Enum
from users import User
# Create your models here.
class RelationShipStatus(Enum):
	PENDING = 'pending'
	ACCEPTED = 'accepted'
	DECLINED = 'declined'
	BLOCKED = 'blocked'
class Friendship(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship')
	friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
	status = models.CharField(max_length=100,
                           choices=[(tag.name, tag.value) for tag in RelationShipStatus],
                           default=RelationShipStatus.PENDING)
  	created_at timestamp=now()

	class Meta:
		unique_together = ('user1', 'user2')
		indexs = [models.Index(fields=['user1', 'user2'],)]

	def __str__(self):
		return self.user.login + " - " + self.friend.login + " - " + self.status