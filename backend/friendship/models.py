from django.db import models
from enum import Enum
from users.models import MyUser

# Create your models here.
class RelationShipStatus(Enum):
	PENDING = 'pending'
	ACCEPTED = 'accepted'
	DECLINED = 'declined'
	BLOCKED = 'blocked'

class FriendRequest(models.Model):
	sender = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='sent_requests')
	receiver = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='received_requests')
	status = models.CharField(max_length=100,
							choices=[(tag.value, tag.name) for tag in RelationShipStatus],
							default=RelationShipStatus.PENDING.value)
	created_at = models.DateTimeField(auto_now_add=True)
	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['sender', 'receiver'],
				name='unique_friendRequest'
			),
		]

class BlockList(models.Model):
	user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='block_list')
	block_users = models.ManyToManyField(MyUser, related_name='blocked_by')

class FriendShip(models.Model):
	user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='friendships')
	friend = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name='friends_with')
	blocked_by = models.ForeignKey(
		MyUser, null=True, blank=True, on_delete=models.SET_NULL, related_name='blocks'
	)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		constraints = [
			models.UniqueConstraint(
				fields=['user', 'friend'],
				name='unique_friendship'
			),
		]

	def save(self, *args, **kwargs):
		if self.user.id > self.friend.id:
			self.user, self.friend = self.friend, self.user
		super().save(*args, **kwargs)