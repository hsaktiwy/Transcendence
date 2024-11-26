from django.urls import re_path
from . import consumers
from game.consumer import GameConsumer
websocket_urlpatterns = [
    re_path(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/game/', GameConsumer.as_asgi())
]