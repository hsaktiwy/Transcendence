# Generated by Django 4.2.13 on 2024-09-16 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_myuser_profile_pic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='birthDay',
        ),
        migrations.AddField(
            model_name='myuser',
            name='last_visit',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='state',
            field=models.CharField(choices=[('online', 'Online'), ('in_game', 'In Game'), ('offline', 'Offline')], default='offline', max_length=20),
        ),
    ]