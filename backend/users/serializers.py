from rest_framework import serializers
from .models import MyUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['login', 'firstName', 'lastName', 'email', "birthDay",'profile_pic', 'password', 'two_factor_auth', 'two_factor_auth_code']
    def __init__(self, *args, **kwargs):
        context = kwargs.get('context', {})
        request = context.get('request', None)
        super(UserSerializer, self).__init__(*args, **kwargs)
        if request and not request.user.is_authenticated:
            self.fields.pop('password')
            self.fields.pop('two_factor_auth')
            self.fields.pop('two_factor_auth_code')

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            login=validated_data['login'],
            email=validated_data['email'],
            firstName=validated_data.get('firstName', ''),
            lastName=validated_data.get('lastName', ''),
            birthDay=validated_data['birthDay'],
            # profile_pic=validated_data['profile_pic'],
            password=validated_data['password'],
        )
        return user