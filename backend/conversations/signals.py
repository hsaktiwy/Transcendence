from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Message, Channel
from django.utils import timezone

@receiver(post_save, sender=Message, dispatch_uid="Update_Channel_LastUpdate")

def UpdateChannelLastUpdate(sender, instance, created, **kwargs):
    #print(f"Signal triggered for Message ID {instance.id}")
    if created:
        channel = Channel.objects.get(id=instance.id_channel_fk.id)
        channel.last_update = timezone.now()
        channel.save()