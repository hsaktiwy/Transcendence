import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import decode_token



User = get_user_model()


    
class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        csrf_token  = request.headers.get('X-CSRFToken')
        csrf_cookie = request.COOKIES.get('csrftoken')
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')
        if not access_token:
            return None
        payload = decode_token(access_token)
        
        if payload == 0:
            raise AuthenticationFailed('Expired token')
        elif payload == -1:
            raise AuthenticationFailed('Invalid token')
        
        # if request.method != 'get':
        if csrf_token != csrf_cookie and request.path != '/api/user/login/' and request.path != '/api/user/register/' :
                raise AuthenticationFailed('csrf_token mismatch')
        # elif not csrf_token and not csrf_cookie:
        #     if request.path != '/api/user/login/' and request.path != '/api/user/register/':
        #         raise AuthenticationFailed('csrf_token missed')
        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        
        return (user, None)

