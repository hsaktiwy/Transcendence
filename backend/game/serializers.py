from rest_framework import serializers
from .models import Game
from users.serializers import UserSerializer
class GameSerializer(serializers.ModelSerializer):
    user_p1 = UserSerializer(read_only=True)  # Use UserSerializer for user_p1
    user_p2 = UserSerializer(read_only=True)  # Use UserSerializer for user_p2
    winner = UserSerializer(read_only=True)   # Use UserSerializer for winner
    loser = UserSerializer(read_only=True)    # Use UserSerializer for loser
    class Meta:
        model = Game
        fields = '__all__'