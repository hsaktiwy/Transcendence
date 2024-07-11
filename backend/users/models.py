from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from .validators import Validator_birthDay

class MyUserManager(BaseUserManager):
    def create_user(self, login, email, birthDay,password,**extra_fields):
        if not login:
            ValueError("User must set the login")
        email = self.normalize_email(email)
        Validator_birthDay(email)
        user = self(login=login, email=email, birthDay=birthDay, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

# Create your models here.
class MyUser(AbstractBaseUser):
    #password field already exist in the AbstractBaseUser model no need to overide it
    login = models.CharField(max_length=50, unique=True)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True, max_length=255, verbose_name="email address")
    birthDay = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    two_factor_auth = models.BooleanField(default=False)
    two_factor_auth_code = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["email", "firstName", "lastName", "birthDay"]

    objects = MyUserManager()

    def __str__(self):
        return self.login