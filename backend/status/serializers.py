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
        fields = [ 'type' , 'description', 'title' , 'game_numbers' , 'win_streak' , 'unlocked','icon']


class RankProfileSerializer(serializers.ModelSerializer):
    rank = serializers.SerializerMethodField()

    class Meta:
        model = ProfileStatus
        fields = ['id_user_fk', 'rank', 'level']

    def get_rank(self, obj):
        """
        Assign rank dynamically based on level
        """
        # Order all profiles by level in descending order
        ranked_profiles = ProfileStatus.objects.order_by('-level')
        # Find the rank of the current profile (1-based index)
        rank = list(ranked_profiles).index(obj) + 1
        return rank