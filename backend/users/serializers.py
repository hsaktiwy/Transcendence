from rest_framework import serializers
from .models import MyUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ['login', 'email', 'firstName', 'lastName', 'password', 'state', 'last_visit', 'profile_pic']

    def create(self, validated_data):
        return MyUser.objects.create_user(
            login=validated_data['login'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
        )

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True)
    password2 = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        model = MyUser
        fields = ['login', 'email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, data):
        if (data['password'] != data['password2']):
           raise serializers.ValidationError("Passwords do not match.")
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        return MyUser.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    login = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = MyUser
        fields = ['login',  'password']

    def validate(self, data):
        login = data.get('login')
        password = data.get('password')
        user = authenticate(login=login, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")
        if isinstance(user, MyUser):
            user.state = 'online'
            user.save()
        return{
            'user': user
        }