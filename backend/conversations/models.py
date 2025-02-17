from django.db import models
from users.models import MyUser
# Create your models here.

class Channel(models.Model):
    users = models.ManyToManyField(MyUser)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    id_channel_fk = models.ForeignKey('channel', on_delete=models.CASCADE)
    content = models.TextField()
    isread=models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)