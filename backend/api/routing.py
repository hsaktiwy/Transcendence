from django.urls import re_path
from . import consumers
from game.consumer import GameConsumer ,ApiConsumer,GameRoomConsumer, ApiChessConsumer, GameChessRoomConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/game/', GameConsumer.as_asgi()),

    re_path(r'ws/server-endpoint-socket/$', ApiConsumer.as_asgi()),
    re_path(r'ws/ping-pong/room/(?P<room_name>\w+)$', GameRoomConsumer.as_asgi()),

    re_path(r'ws/server-endpoint-socket-chess/$', ApiChessConsumer.as_asgi()),
    re_path(r'ws/chess/room/(?P<room_name>\w+)$', GameChessRoomConsumer.as_asgi()),
]
