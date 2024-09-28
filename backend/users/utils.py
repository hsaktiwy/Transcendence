import jwt
import datetime
from django.conf import settings
from rest_framework.response import Response
from django.utils import timezone
# from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.exceptions import AuthenticationFailed
from django.middleware.csrf import get_token
from rest_framework import status

SECRET_KEY = settings.JWT_SECRET_KEY
ACCESS_TOKEN_EXPIRATION = datetime.timedelta(minutes=settings.ACCESS_TOKEN_LIFETIME)
REFRESH_TOKEN_EXPIRATION = datetime.timedelta(days=settings.REFRESH_TOKEN_LIFETIME)
ALGORITHM='HS256'

def generate_access_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + ACCESS_TOKEN_EXPIRATION,
        'iat': datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def generate_refresh_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + REFRESH_TOKEN_EXPIRATION,
        'iat': datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return 0
    except jwt.InvalidTokenError:
        return -1

def my_exception_handler(exc, context):
    from rest_framework.views import exception_handler as drf_exception_handler
    response = drf_exception_handler(exc, context)
    response = Response({
            'detail': str(exc),
        }, status=401)
    exception_message = str(exc.detail) if hasattr(exc, 'detail') else str(exc)
    print(exception_message)
    if isinstance(exc, AuthenticationFailed) and exception_message == 'Expired token':
       response.set_cookie(
            key='access_token',
            value='',
            max_age=0,
            httponly=True,
            samesite='Lax'
       )
    return response

def generate_tokens_response(user, request):
    csrf_token = get_token(request)
    access_token = generate_access_token(user)
    refresh_token = generate_refresh_token(user)
    resp = Response({
        'message': 'User logged in successfuly'
    }, status=status.HTTP_200_OK)
    resp.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        samesite='Lax'
    )
    resp.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        samesite='Lax'
    )
    resp.set_cookie(
        key='csrftoken',
        value=csrf_token,
        httponly=False,
        samesite='Lax'
    )
    return resp