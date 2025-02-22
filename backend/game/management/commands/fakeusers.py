from datetime import timedelta
from django.utils import timezone
from django.core.management.base import BaseCommand
from game.models import Game,GameType, GameEnumStatus  # Replace with your app and model name
from users.models import MyUser  # Replace with your user model path
import random
import sys
class Command(BaseCommand):
    help = "Populates the Users model with random fake data"

    def handle(self, *args, **kwargs):
        username_list = ["Guts1","Hamza1", "Mosashy1", "Yojiro1", "Yassu1", "Yakuza1", "Baki1"]
        # email_list_bonuse = ["_mail"]
        password = "Hamza@123"
        for username in username_list:
            try:
                user = MyUser.objects.create(login=username, firstName=username, lastName=username, password=password,email=username+"@gmail.com")
                print(f"{user.id}, {user.login}, {user.email}")
            except Exception as e:
                print(e, file=sys.stderr)