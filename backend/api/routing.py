from django.urls import re_path
from . import consumers
<<<<<<< HEAD
from game.consumer import ApiConsumer,GameRoomConsumer 
=======
from game.consumer import ApiConsumer,GameRoomConsumer, ApiChessConsumer, GameChessRoomConsumer
>>>>>>> idouni

websocket_urlpatterns = [
    re_path(r'ws/chat/', consumers.ChatConsumer.as_asgi()),
    # re_path(r'ws/game/', GameConsumer.as_asgi()),

    re_path(r'ws/server-endpoint-socket/', ApiConsumer.as_asgi()),
    re_path(r'ws/ping-pong/room/(?P<room_name>\w+)$', GameRoomConsumer.as_asgi()),

<<<<<<< HEAD
    # re_path(r'ws/server-endpoint-socket-chess/$', ApiChessConsumer.as_asgi()),
    # re_path(r'ws/chess/room/(?P<room_name>\w+)$', GameChessRoomConsumer.as_asgi()),
=======
    re_path(r'ws/server-endpoint-socket-chess/$', ApiChessConsumer.as_asgi()),
    re_path(r'ws/chess/room/(?P<room_name>\w+)$', GameChessRoomConsumer.as_asgi()),
>>>>>>> idouni
    re_path(r"^ws/.*$", consumers.NoMatchConsumer.as_asgi()),
]
