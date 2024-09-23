import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from .utils import decode_token
from colorama import Fore, Style, init
from rest_framework.exceptions import APIException
from django.utils.deprecation import MiddlewareMixin
from rest_framework.response import Response
from django.utils import timezone


User = get_user_model()


# class CustomAuthenticationFailed(APIException):
    
class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # authorization_header = request.headers.get('Authorization')
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
            
        if csrf_token != payload['csrf_token']:
            raise AuthenticationFailed('csrf_token mismatch')
        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found')
        
        return (user, None)
    
# class AuthFailedMiddleware(MiddlewareMixin):
#     def __init__(self, get_response):
#         self.get_response = get_response
#     def __call__(self, request):
#     # Code to be executed for each request before
#     # the view (and later middleware) are called.

#         response = self.get_response(request)

#     # Code to be executed for each request/response after
#     # the view is called.

#         return response
#     def process_exception(self, request, exception):

#         resp = None
#         if isinstance(exception, AuthenticationFailed) and :
#             resp = Response({
#                 'detail': str(exception)
#             }, status=401)
#             resp.set_cookie(
#                 key='access_token',
#                 value='',
#                 expires=timezone.now()
#             )
#         return resp

# def expiredtokenhandler(exc, context):
#     response = exception_handler(exc, context)

#     if isinstance(exc, AuthenticationFailed) and str(exec) == 'Expired token':
#             # Customize the response for AuthenticationFailed
#             response = Response({
#                 'detail': str(exc),
#                 'custom_header': 'Custom Value'
#             }, status=401)

#     return response