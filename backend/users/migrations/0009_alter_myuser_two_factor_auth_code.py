# Generated by Django 4.2.13 on 2024-10-17 12:19

from django.db import migrations, models
import pyotp


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_myuser_oauth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='two_factor_auth_code',
            field=models.CharField(default=pyotp.random_base32, max_length=16),
        ),
    ]