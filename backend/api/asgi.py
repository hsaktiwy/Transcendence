"""
ASGI config for api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

# 1 import first 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

# 2 get the asgi application : wtf ths cause my asgi to have except APPNOTREGISTER if it put directly in the ProtocolTypeRoute
from django.core.asgi import get_asgi_application
django_asgi = get_asgi_application()


from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from . import routing
from .utils import JWTAuthMiddleware


application = ProtocolTypeRouter(
    {
        'http' : django_asgi,
        'websocket' : JWTAuthMiddleware(
            AuthMiddlewareStack(
                URLRouter(
                    routing.websocket_urlpatterns
                )
            )
        )
    }
)
