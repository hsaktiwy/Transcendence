from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('login', 'firstName', 'lastName', 'email', 'password_hash', 'two_factor_auth', 'two_factor_auth_code') 