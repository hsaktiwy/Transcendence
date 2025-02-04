from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from .validators import Validator_birthDay
from django.core.exceptions import ValidationError
from PIL import Image
import pyotp
import uuid
from django.core.validators import RegexValidator, EmailValidator

name_validator = RegexValidator(
    regex=r"^(?=.{3,50}$)[A-Za-z]+([ '-][A-Za-z]+)*$",
    message="Name should be 3-50 characters long and contain only letters and spaces."
)

username_validator = RegexValidator(
    regex=r'^[a-zA-Z0-9_]{3,20}$',
    message="Username must be 3-20 characters and can only contain letters, numbers, and underscores."
)

email_validator = EmailValidator(message="It should be a valid email address!")

password_validator = RegexValidator(
    regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$',
    message="Password should be 8-20 characters long and include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character."
)
def user_pic_location(instance, filename):
    return 'user{0}/{1}'.format(instance.id,filename)
def validateImage(image):
    limit_mb = 5 
    if image.size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Max size of file is {limit_mb} MB")

class MyUserManager(BaseUserManager):
    def create_user(self, email, firstName, lastName, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        if password:
            password_validator(password)
        user = self.model(email=email, firstName=firstName, lastName=lastName, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, firstName, lastName, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, firstName, lastName, password, **extra_fields)

# Create your models here.
class MyUser(AbstractBaseUser, PermissionsMixin):
    ONLINE    = 'online'
    IN_GAME   = 'in_game'
    READY     = 'ready'
    ALREADYIN = 'alreadyin'
    END_GAME  = 'end_game'
    OFFLINE   = 'offline'
    
    STATE_CHOICES = [
        (ONLINE,  'Online'),
        (IN_GAME, 'In Game'),
        (END_GAME,'End Game'),
        (ALREADYIN,'alreadyin'),
        (READY,   'Ready'),
        (OFFLINE, 'Offline'),
    ]

    unique_id = models.UUIDField(primary_key=False,default=uuid.uuid4, editable=False, unique=True)
    login = models.CharField(max_length=20, unique=True, blank=True, null=True, validators=[username_validator])
    firstName = models.CharField(max_length=50,validators=[name_validator])
    lastName = models.CharField(max_length=50, validators=[name_validator])
    email = models.EmailField(unique=True, max_length=255, verbose_name="email address", validators=[email_validator])
    two_factor_auth = models.BooleanField(default=False)
    two_factor_auth_code = models.CharField(max_length=32, default=pyotp.random_base32)
    profile_pic = models.ImageField(upload_to=user_pic_location, blank=True, default='default.jpeg', validators=[validateImage])
    CoverProfile = models.ImageField(upload_to=user_pic_location, blank=True, default='default.jpeg')
    created_at = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default=OFFLINE)
    last_visit = models.DateTimeField(null=True, blank=True)
    oauth = models.BooleanField(default=False)


    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)               

    def isDefaultImage(self):
        return self.profile_pic.name == 'default.jpeg'
        
    def isDefaultCoverImage(self):
        return self.CoverProfile.name == 'default.jpeg'

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [ "firstName", "lastName"]
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    objects = MyUserManager()

    def __str__(self):
        return self.email
    


    #delete setMatchData

    #modify all setReomteGameData