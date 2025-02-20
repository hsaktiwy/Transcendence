from django.contrib import admin
from .models import FriendShip, BlockList, FriendRequest

admin.site.register([FriendShip, BlockList, FriendRequest])