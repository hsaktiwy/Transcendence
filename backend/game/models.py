from django.db import models
from users.models import User
from enum import Enum

# Create your models here.
class GameEnumStatus(Enum):
    WAITING = 'waiting'
    IN_PROGRESS = 'in_progress'
    ENDED = 'ended'

class Game(models.Model):
    players = models.ManyToManyField(User)
    winner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='game_winner', null=True, blank=True)
    status =  models.CharField(
            max_length=20,
            choices=[(tag.value, tag.name) for tag in GameEnumStatus],
            default=GameEnumStatus.WAITING.value
            )
    start = models.DateTimeField(auto_now_add=True)
    end = models.DateTimeField(null=True, blank=True)
