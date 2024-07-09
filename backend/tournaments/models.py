from django.db import models
from game.models import Game
# Create your models here.
class Tournament(models.Model):
  games = models.ManyToManyField(Game)
  start  = models.DateTimeField(auto_now_add=True)
  end  = models.DateTimeField(null=True, blank=True)