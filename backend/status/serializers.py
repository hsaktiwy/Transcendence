from rest_framework import serializers
from .models import Notification, ProfileStatus, Achievements

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ProfileStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileStatus
        fields = '__all__'

class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = [ 'type' , 'description' , 'game_numbers' , 'win_streak' , 'unlocked' ]


class RankProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileStatus
        fields = ['id_user_fk', 'rank', 'level']