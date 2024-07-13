from django.db import models
from enum import Enum

# Create your models here.
class GameInvitationStatus(Enum):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'

class GameInvitation(models.Model):
    user_sender  = models.ForeignKey('users.Myuser', on_delete=models.CASCADE, related_name="sender")
    user_receiver  = models.ForeignKey('users.Myuser', on_delete=models.CASCADE, related_name="receiver")
    status = models.CharField(
                max_length=20,
                choices=[(tag.value, tag.name) for tag in GameInvitationStatus],
                default=GameInvitationStatus.PENDING.value)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user_sender', 'user_receiver')
        indexes = [models.Index(fields=['user_sender', 'user_receiver'])]