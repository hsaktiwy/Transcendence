from django.db import models
from users.models import MyUser
# Create your models here.

class Channel(models.Model):
    users = models.ManyToManyField(MyUser)
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    sender = models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    id_channel_fk = models.ForeignKey('channel', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    # def clean(self):
    #     if not self.id_channel_fk.users.filter(id=self.id_user_fk.id).exist():
    #         raise ValueError('Error user must be in the channel to add message to it')
    
    # def save(self, *arg, **kwargs):
    #     self.clean()
    #     super().save(*arg, **kwargs)