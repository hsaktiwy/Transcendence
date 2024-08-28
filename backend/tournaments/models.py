from django.db import models
from game.models import Game
from users.models import User
# Create your models here.

class Tournament(models.Model):
  games = models.ManyToManyField(Game)
  players = models.ManyToManyField(User)
  start  = models.DateTimeField(auto_now_add=True)
  end  = models.DateTimeField(null=True, blank=True)