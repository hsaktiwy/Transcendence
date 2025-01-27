from django.core.management.base import BaseCommand
from users.models import MyUser
from status.models import ProfileStatus  # Replace with your app and model path
import random

class Command(BaseCommand):
    help = "Populates the ProfileStatus model with random fake data"

    def handle(self, *args, **kwargs):
        all_users = MyUser.objects.all()
        if not all_users.exists():
            self.stderr.write("Error: No users found in the database.")
            return

        for user in all_users:
            # Generate random stats for each user
            total_games = random.randint(10, 50)  # Between 10 and 50 games
            wins = random.randint(0, total_games)  # Wins can't exceed total games
            losses = total_games - wins  # Losses calculated based on total games
            rank = random.randint(1, 100)  # Random rank between 1 and 100
            level = round(random.uniform(0, 10), 2)  # Level as a float (0 to 10)

            # Create or update the ProfileStatus for the user
            profile_status, created = ProfileStatus.objects.update_or_create(
                id_user_fk=user,
                defaults={
                    'total_games': total_games,
                    'wins': wins,
                    'lose': losses,
                    'rank': rank,
                    'level': level,
                },
            )

            action = "Created" if created else "Updated"
            self.stdout.write(f"{action} ProfileStatus for user {user.login}: "
                              f"Total Games: {total_games}, Wins: {wins}, Losses: {losses}, "
                              f"Rank: {rank}, Level: {level}")
