from rest_framework import serializers
from .models import Game
from users.serializers import PublicUserSerializer
class GameSerializer(serializers.ModelSerializer):
    user_p1 = PublicUserSerializer(read_only=True)
    user_p2 = PublicUserSerializer(read_only=True)
    class Meta:
        model = Game
        fields = '__all__'