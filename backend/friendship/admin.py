from django.contrib import admin
from .models import FriendShip, BlockList, FriendRequest
# Register your models here.

admin.site.register([FriendShip, BlockList, FriendRequest])