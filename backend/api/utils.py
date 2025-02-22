import jwt
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

def get_cookies(scope):
    cookies_header = dict(
        (key.decode('utf-8'), value.decode('utf-8')) 
        for key, value in scope['headers'] 
        if key == b'cookie'
    )
    cookies = {}
    if cookies_header:
        cookie_string = cookies_header.get('cookie')
        if cookie_string:
            for cookie in cookie_string.split(';'):
                key, value = cookie.split('=', 1)
                cookies[key.strip()] = value.strip()
    return cookies
class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        cookies = get_cookies(scope)
        access_token = cookies.get('access_token') 
        try:
            payload = jwt.decode(access_token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
            scope['user'] = await database_sync_to_async(User.objects.get)(id=payload['user_id'])
        except jwt.ExpiredSignatureError:
            return await self.close_connection(send)
        except jwt.InvalidTokenError:
            return await self.close_connection(send)

        return await super().__call__(scope, receive, send)

    async def close_connection(self, send):
        await send({
            'type': 'websocket.close',
            'code': 4000, 
        })
