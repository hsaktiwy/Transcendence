from rest_framework import serializers
from .models import MyUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = MyUser
        fields = ['login', 'email', 'firstName', 'lastName', 'password', 'state', 'last_visit', 'profile_pic', 'oauth', 'two_factor_auth']
        extra_kwargs = {
            'login': {'required': False},
            'email': {'required': False},
            'firstName': {'required': False},
            'lastName': {'required': False},
            'state': {'required': False},  
            'profile_pic': {'required': False},  
            'two_factor_auth': {'required': False},  
            'oauth': {'required': False}
        }
    # def create(self, validated_data):
    #     return MyUser.objects.create_user(
    #         login=validated_data['login'],
    #         email=validated_data['email'],
    #         first_name=validated_data['first_name'],
    #         last_name=validated_data['last_name'],
    #         password=validated_data['password'],
    #     )
    def update(self, instance, validated_data):
        instance.login = validated_data.get('login', instance.login)
        instance.email = validated_data.get('email', instance.email)
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.state = validated_data.get('state', instance.state)
        instance.last_visit = validated_data.get('last_visit', instance.last_visit)
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.oauth = validated_data.get('oauth', instance.oauth)
        instance.two_factor_auth = validated_data.get('two_factor_auth', instance.two_factor_auth)
        instance.save()
        return instance

class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['login', 'email', 'firstName', 'lastName', 'state', 'last_visit', 'profile_pic']
    

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True)
    password2 = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        model = MyUser
        fields = ['login', 'email', 'firstName', 'lastName', 'password', 'password2']

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