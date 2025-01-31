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
    wins = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    _wins = models.IntegerField(default=0)
    _lose = models.IntegerField(default=0)
    rank = models.IntegerField()
    level = models.FloatField(default=0)


class   AchievementTypes(models.TextChoices):
    FIRST_MATCH = 'FIRST_MATCH'
    WINNING_STREAK='WIN_STREAK'
    BRONZE = 'BRONZE'
    SILVER = 'SILVER'
    GOLD = 'GOLD'
    PLATINUM = 'PLATINUM'
    LEGEND = 'LEGEND'

ACHIEVEMENT_DESCRIPTIONS = {
    AchievementTypes.FIRST_MATCH: "First match",
    AchievementTypes.WINNING_STREAK: "5 wins streak",
    AchievementTypes.BRONZE: "Bronze",
    AchievementTypes.SILVER: "Silver",
    AchievementTypes.GOLD: "Gold",
    AchievementTypes.PLATINUM: "Platinum",
    AchievementTypes.LEGEND: "Legend",
}

ACHIEVEMENT_ICONS = {
    AchievementTypes.FIRST_MATCH: "firstPaddle",
    AchievementTypes.WINNING_STREAK: "streak",
    AchievementTypes.BRONZE: "bronze",
    AchievementTypes.SILVER: "silver",
    AchievementTypes.GOLD: "gold",
    AchievementTypes.PLATINUM: "platinum",
    AchievementTypes.LEGEND: "legend",
}

class Achievements(models.Model):
    id_user_fk = models.ForeignKey('users.MyUser', on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=AchievementTypes.choices)
    description  = models.CharField(max_length=50,null=True, blank=True)
    game_numbers = models.IntegerField(default=0)
    win_streak = models.IntegerField(default=0)
    unlocked = models.BooleanField(default=False)
    icon = models.CharField(max_length=30, null=True, blank=True) 

    def save(self , *arg, **kargs):
        print("Achievements save: ", self, arg, kargs)
        if (self.type and not self.description):
            self.icon = ACHIEVEMENT_ICONS.get(self.type, 'firstPaddle')
            self.description = ACHIEVEMENT_DESCRIPTIONS.get(self.type,"No description available.")
            if (self.type == AchievementTypes.BRONZE or self.type == AchievementTypes.WINNING_STREAK):
                self.game_numbers = 5
            elif (self.type == AchievementTypes.SILVER):
                self.game_numbers = 15
            elif (self.type == AchievementTypes.GOLD):
                self.game_numbers = 25
            elif (self.type == AchievementTypes.PLATINUM):
                self.game_numbers = 35
            elif (self.type == AchievementTypes.LEGEND):
                self.game_numbers = 50
            elif (self.type == AchievementTypes.FIRST_MATCH):
                self.game_numbers = 1
        super().save(*arg, **kargs)

