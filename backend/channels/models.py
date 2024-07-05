from django.db import models
from users.models import User
# Create your models here.

class channel(models.Model):
    users = models.ManyToManyField(User)
    created_at = models.DateTimeField(auto_now_add=True)
class Message(models.Model):
    id_user_fk = models.ForeignKey('users.User', on_delete=models.CASCADE)
    id_channel_fk = models.ForeignKey('channel', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)