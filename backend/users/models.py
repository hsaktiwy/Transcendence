from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from .validators import Validator_birthDay
from django.core.exceptions import ValidationError
from PIL import Image

def user_pic_location(instance, filename):
    return 'user{0}/{1}'.format(instance.id,filename)
def validateImage(image):
    limit_mb = 5 
    print(Image.open(image))
    if image.size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Max size of file is {limit_mb} MB")

class MyUserManager(BaseUserManager):
    def create_user(self, email, login, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, login=login, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, login, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(email, login, first_name, last_name, password, **extra_fields)

# Create your models here.
class MyUser(AbstractBaseUser, PermissionsMixin):
    ONLINE = 'online'
    IN_GAME = 'in_game'
    OFFLINE = 'offline'
    
    STATE_CHOICES = [
        (ONLINE, 'Online'),
        (IN_GAME, 'In Game'),
        (OFFLINE, 'Offline'),
    ]

    login = models.CharField(max_length=50, unique=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=255, verbose_name="email address")
    two_factor_auth = models.BooleanField(default=False)
    two_factor_auth_code = models.CharField(max_length=255, blank=True, null=True)
    profile_pic = models.ImageField(upload_to=user_pic_location, blank=True, default='default.jpg', validators=[validateImage])
    created_at = models.DateTimeField(auto_now_add=True)
    state = models.CharField(max_length=20, choices=STATE_CHOICES, default=OFFLINE)
    last_visit = models.DateTimeField(null=True, blank=True)


    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def isDefaultImage(self):
        return self.profile_pic.name == 'default.jpg'

    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["email", "firstName", "lastName"]
    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    
    objects = MyUserManager()

    def __str__(self):
        return self.login