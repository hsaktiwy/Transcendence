from rest_framework import serializers
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('login', 'firstName', 'lastName', 'email', "birthDay",'password', 'two_factor_auth', 'two_factor_auth_code') 