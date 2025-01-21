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

        for _ in range(20):
            user_p1 = random.choice(all_users)
            user_p2 = random.choice([user for user in all_users if user != user_p1])
            score_p1 = random.randint(0, 10)
            score_p2 = random.randint(0, 10)

            if score_p1 > score_p2:
                winner, loser = user_p1, user_p2
            elif score_p2 > score_p1:
                winner, loser = user_p2, user_p1
            else:
                winner, loser = None, None  # Tie game (optional logic)

            game = Game.objects.create(
                user_p1=user_p1,
                user_p2=user_p2,
                winner=winner,
                loser=loser,
                score_p1=score_p1,
                score_p2=score_p2,
                status=random.choice([tag.value for tag in GameEnumStatus])
            )
            self.stdout.write(f"Created game: {game}")
