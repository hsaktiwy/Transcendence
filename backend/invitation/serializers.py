from rest_framework import serializers
from .models import GameInvitation

class GameInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameInvitation
        feilds = '__all__'