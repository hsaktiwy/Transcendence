from django.db import models

# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=50)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    two_factor_auth = models.BooleanField(default=False)
    two_factor_auth_code = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.login