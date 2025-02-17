from django.db.models.signals import post_save, pre_save
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import MyUser
from friendship.models import BlockList
from status.models import ProfileStatus, Notification
from datetime import timedelta

@receiver(post_save, sender=MyUser, dispatch_uid="create_profile_status")
def CreateProfileStatus(sender, instance, created, **kwargs):
    if created:
        ProfileStatus.objects.create(id_user_fk=instance, total_games=0, wins=0, lose=0, _wins=0,_lose=0, rank=0)
        Notification.objects.create(id_user_fk=instance, content="Welcome to KingPong", type="system")
        BlockList.objects.create(user=instance)
