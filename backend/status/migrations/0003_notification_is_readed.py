# Generated by Django 4.2.13 on 2024-08-17 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('status', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='is_readed',
            field=models.BooleanField(default=False),
        ),
    ]