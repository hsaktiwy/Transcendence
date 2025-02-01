from datetime import timedelta
from django.utils import timezone
from django.core.management.base import BaseCommand
from game.models import Game,GameType, GameEnumStatus  # Replace with your app and model name
from users.models import MyUser  # Replace with your user model path
import random

class Command(BaseCommand):
    help = "Populates the Game model with fake data"

    def handle(self, *args, **kwargs):
        all_users = list(MyUser.objects.all())
        if len(all_users) < 2:
            self.stderr.write("Error: There should be at least two users in the database.")
            return

        now = timezone.now()
        start_date = now - timedelta(days=35)

        for week in range(5):
            week_start = start_date + timedelta(days=week * 7)
            week_end = week_start + timedelta(days=7)
            for _ in range(20):
                array =['CHESS', 'PONG']
                type = random.choice(array)
                user_p1 = random.choice(all_users)
                user_p2 = random.choice([user for user in all_users if user != user_p1])
                score_p1 = random.randint(0, 10)
                score_p2 = random.randint(0, 10)

                time_difference = int((week_end - week_start).total_seconds())
                random_seconds = random.randint(0, time_difference - 1)  # Fix: Avoid always hitting `week_end`
                randtime = week_start + timedelta(seconds=random_seconds)

                if score_p1 > score_p2:
                    winner, loser = user_p1, user_p2
                else:
                    winner, loser = user_p2, user_p1
                draw = random.choice([True, False]) if type == 'CHESS' else False
                game = Game.objects.create(
                    type=type,
                    user_p1=user_p1,
                    user_p2=user_p2,
                    winner=winner,
                    loser=loser,
                    score_p1=score_p1,
                    score_p2=score_p2,
                    draw = draw,
                    status=GameEnumStatus.ENDED,
                )
                game.time = randtime
                game.save()
                self.stdout.write(f"Created game: {game.time} {game.type} {game.user_p1}")