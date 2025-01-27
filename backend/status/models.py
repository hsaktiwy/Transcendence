from django.db import models
from users.models import MyUser
from enum import Enum
from datetime import  timedelta
from django.utils import timezone

# Create your models here.
class NotificationType(Enum):
    system = 'system'
    friendship = 'friendship'
    gameInvitation = 'gameInvitation'
    tournament = 'tournament'
    message = 'message'

class Notification(models.Model):
    @classmethod
    def clean_up_notifications(cls, user): #this is for clean up
        now = timezone.now()
        cls.objects.filter(
            id_user_fk=user,
            is_readed=True,
            created__lt=now-timedelta(hours=24)
        ).delete()
        cls.objects.filter(
            id_user_fk=user,
            is_readed=False,
            created__lt=now-timedelta(days=30)
        ).delete()
    
    id_user_fk = models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    content = models.TextField()
    type = models.CharField(
            max_length=20,
            choices=[(tag.value, tag.name) for tag in NotificationType],
            default=NotificationType.system.value,
        )
    channel_id = models.IntegerField(null=True)
    friend_request_id = models.IntegerField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    is_readed =  models.BooleanField(default=False)

class ProfileStatus(models.Model):
    id_user_fk =  models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    total_games = models.IntegerField()
    wins = models.IntegerField()
    lose = models.IntegerField()
    rank = models.IntegerField()
    level = models.FloatField(default=0)

class Acheivements(models.Model):
    id_user_fk = models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    name  = models.CharField(null=True)


