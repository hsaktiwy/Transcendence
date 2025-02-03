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
        username_list = ["Guts","Hamza", "Mosashy", "Yojiro", "Yassu", "Yakuza", "Baki"]
        # email_list_bonuse = ["_mail"]
        password = "Hamza@123"
        for username in username_list:
            try:
                user = MyUser.objects.create_user(login=username, firstName=username, lastName=username, password=password,email=username+"@gmail.com")
                print(f"{user.id}, {user.login}, {user.email}")
            except Exception as e:
                print(e, file=sys.stderr)