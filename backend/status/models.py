from django.db import models
from users.models import User
from enum import Enum

# Create your models here.
class NotificationType(Enum):
    system = 'system'
    friendship = 'friendship'
    gameInvitation = 'gameInvitation'
    tournament = 'tournament'

class Notification(models.Model):
    id_user_fk = models.ForeignKey('users.User', on_delete=models.CASCADE)
    content = models.TextField()
    type = models.CharField(
            max_length=20,
            choices=[(tag.value, tag.name) for tag in NotificationType],
            default=NotificationType.system.value,
        )
    created = models.DateTimeField(auto_now_add=True)

class ProfileStatus(models.Model):
    id_user_fk =  models.ForeignKey('users.User', on_delete=models.CASCADE)
    total_games = models.IntegerField()
    wins = models.IntegerField()
    lostes = models.IntegerField()
    rank = models.IntegerField()


