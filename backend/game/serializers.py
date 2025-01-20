from rest_framework import serializers
from .models import Game
from users.serializers import PublicUserSerializer
class GameSerializer(serializers.ModelSerializer):
    user_p1 = PublicUserSerializer(read_only=True)  # Use PublicUserSerializer for user_p1
    user_p2 = PublicUserSerializer(read_only=True)  # Use PublicUserSerializer for user_p2
    class Meta:
        model = Game
        fields = '__all__'