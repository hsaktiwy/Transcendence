from django.db import models
from users.models import MyUser
from enum import Enum

# Create your models here.
class GameEnumStatus(Enum):
    WAITING = 'waiting'
    IN_PROGRESS = 'in_progress'
    ENDED = 'ended'

class GameType(Enum):
    CHESS = "CHESS"
    PONG = "PONG"

class Game(models.Model):
    type = models.CharField(
            max_length=10,
            choices=[(tag.value, tag.name) for tag in GameType],
            default=GameType.PONG.value
    )
    user_p1 = models.ForeignKey('users.MyUser', on_delete=models.CASCADE, related_name='games_as_p1', null=True, blank=True)
    user_p2 = models.ForeignKey('users.MyUser', on_delete=models.CASCADE, related_name='games_as_p2', null=True, blank=True)
    winner = models.ForeignKey('users.MyUser', on_delete=models.CASCADE, related_name='wins', null=True, blank=True)
    loser = models.ForeignKey('users.MyUser', on_delete=models.CASCADE, related_name='losts', null=True, blank=True)
    score_p1 = models.IntegerField(default=0)
    score_p2 = models.IntegerField(default=0)
    # this can be useless 
    status =  models.CharField(
            max_length=20,
            choices=[(tag.value, tag.name) for tag in GameEnumStatus],
            default=GameEnumStatus.WAITING.value
    )
    # score_p1 = 
    time = models.DateTimeField(auto_now_add=True)
