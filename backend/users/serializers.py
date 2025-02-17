from rest_framework import serializers
from .models import MyUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = MyUser
        fields = ['unique_id' ,'login', 'email', 'firstName', 'lastName', 'password', 'old_password','password2', 'state', 'last_visit', 'profile_pic', 'CoverProfile', 'oauth', 'two_factor_auth', 'level']
        extra_kwargs = {
            'unique_id': {'required': False},
            'login': {'required': False},
            'email': {'required': False},
            'firstName': {'required': False},
            'lastName': {'required': False},
            'state': {'required': False},  
            'profile_pic': {'required': False},  
            'two_factor_auth': {'required': False},  
            'oauth': {'required': False},
            'CoverProfile' : {'required': False},
            'level': {'required': False}  

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

        old_password = validated_data.get('old_password', None)
        new_password = validated_data.get('password', None)
        confirm_password = validated_data.get('password2', None)
        auth_set = {'oauth', 'two_factor_auth'}
        images_set = {'CoverProfile', 'profile_pic'}
        if images_set & validated_data.keys() and auth_set & validated_data.keys():
            for field in auth_set:
                validated_data.pop(field, None)
        if old_password and new_password and confirm_password:
            if not instance.check_password(old_password):
                raise serializers.ValidationError({"old_password": "Old password is incorrect."})
            elif new_password == old_password:
                raise serializers.ValidationError({"password": "Old password and New Password must be different."})
            if new_password != confirm_password:
                raise serializers.ValidationError({"password2": "New password and confirm password do not match."})
            instance.set_password(new_password)
        instance.login = validated_data.get('login', instance.login)
        instance.email = validated_data.get('email', instance.email)
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.state = validated_data.get('state', instance.state)
        instance.last_visit = validated_data.get('last_visit', instance.last_visit)
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.CoverProfile = validated_data.get('CoverProfile', instance.CoverProfile)
        instance.oauth = validated_data.get('oauth', instance.oauth)
        instance.two_factor_auth = validated_data.get('two_factor_auth', instance.two_factor_auth)
        instance.level = validated_data.get('level', instance.level)  # Added level update


        instance.save()
        return instance

class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['unique_id','login', 'email', 'firstName', 'lastName', 'state', 'last_visit', 'profile_pic', 'CoverProfile', 'level']
    
class SearchUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['unique_id','login', 'firstName', 'lastName', 'profile_pic']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6, write_only=True)
    password2 = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        model = MyUser
        fields = ['email', 'firstName', 'lastName', 'password', 'password2', 'level']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        validated_data['level'] = 0.0  # Default level
        return MyUser.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = MyUser
        fields = ['email',  'password']

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        if isinstance(user, MyUser):
            user.state = 'online'
            user.save()
        return{
            'user': user
        }