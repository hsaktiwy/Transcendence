# Generated by Django 4.2.13 on 2024-07-08 18:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0002_rename_secondnname_user_lastname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('WAITING', 'waiting'), ('IN_PROGRESS', 'in_progress'), ('ENDED', 'ended')], default='waiting', max_length=20)),
                ('start', models.DateTimeField(auto_now_add=True)),
                ('end', models.DateTimeField(auto_now_add=True)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_player1', to='users.user')),
                ('player2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_player2', to='users.user')),
                ('winner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game_winner', to='users.user')),
            ],
        ),
    ]