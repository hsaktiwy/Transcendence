import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import decode_token
from colorama import Fore, Style, init


User = get_user_model()


    
class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print(Fore.RED + request.path + Style.RESET_ALL)
        csrf_token  = request.headers.get('X-CSRFToken')
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')
        if not access_token:
            return None
        payload = decode_token(access_token)
        print(payload)
        
        if payload == 0:
            raise AuthenticationFailed('Expired token')
        elif payload == -1:
            raise AuthenticationFailed('Invalid token')
            
        if csrf_token != payload['csrf_token'] and request.path != '/api/user/login/' and request.path != '/api/user/register/' :
            raise AuthenticationFailed('csrf_token mismatch')
        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        
        return (user, None)

