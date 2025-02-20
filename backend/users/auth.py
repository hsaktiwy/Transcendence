import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import decode_token



User = get_user_model()



class JWTAuthentication(BaseAuthentication):
    AUTH_BYPASS = {
        "/api/user/login/",
        "/api/user/register/",
        "/api/user/logout/",
        "/api/user/check/",
        "/api/user/verify2fa/",
    }

    def authenticate(self, request):
        csrf_token  = request.headers.get('X-CSRFToken')
        csrf_cookie = request.COOKIES.get('csrftoken')
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        payload = self.validate_jwt(access_token, request.path)
        if not payload:
            return None
        self.validate_csrf_token(request, csrf_token, csrf_cookie)

        user = self.get_user(payload["user_id"])
        return (user, None)
    
    def validate_jwt(self, token, path):
        payload = decode_token(token)
        if payload == 0:
            raise AuthenticationFailed("Expired token")
        elif payload == -1:
            if path in self.AUTH_BYPASS:
                return None
            raise AuthenticationFailed("Invalid token")
        return payload
    def validate_csrf_token(self, request ,csrf_cookie,csrf_token):
        if request.method not in ["GET", "HEAD", "OPTIONS"]:
            if not csrf_token or not csrf_cookie:
                raise AuthenticationFailed("CSRF token missing")
            if csrf_token != csrf_cookie:
                raise AuthenticationFailed("CSRF token mismatch")
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")