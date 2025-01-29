from django.urls import re_path
from . import consumers
from game.consumer import GameConsumer ,ApiConsumer,GameRoomConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/game/', GameConsumer.as_asgi()),

    re_path(r'server-endpoint-socket/(?P<user_id>\w+)', ApiConsumer.as_asgi()),
    re_path(r'ping-pong/room/(?P<room_name>\w+)', GameRoomConsumer.as_asgi()),
]
