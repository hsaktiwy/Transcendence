import jwt
import datetime
from django.conf import settings

SECRET_KEY = settings.JWT_SECRET_KEY
ACCESS_TOKEN_EXPIRATION = datetime.timedelta(minutes=settings.ACCESS_TOKEN_LIFETIME)
REFRESH_TOKEN_EXPIRATION = datetime.timedelta(days=settings.REFRESH_TOKEN_LIFETIME)
ALGORITHM='HS256'

def generate_access_token(user, csrf_token):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + ACCESS_TOKEN_EXPIRATION,
        'iat': datetime.datetime.utcnow(),
        'csrf_token' : csrf_token
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