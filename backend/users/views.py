#from django.shortcuts import render
# from rest_framework import generics, status
# from .serializers import UserSerializer
# from .models import MyUser
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from django.http import JsonResponse
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from django.middleware.csrf import get_token
# from rest_framework.response import Response
# import os
# # login
# from django.utils.decorators import method_decorator
# from django.views.decorators.cache import never_cache
# from django.views.decorators.csrf import csrf_protect
# from django.views.decorators.debug import sensitive_post_parameters
# from django.contrib.auth.forms import AuthenticationForm
# from django.shortcuts import redirect
# from rest_framework.decorators import api_view
# from django.contrib.auth import login as auth_login
# from django.views.decorators.http import require_http_methods
# from django.shortcuts import get_object_or_404
# import logging
# logger = logging.getLogger(__name__)

# from rest_framework.permissions import AllowAny
import os
from status.serializers import NotificationSerializer
from status.models import Notification
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import MyUser
from .serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer, PublicUserSerializer
from .utils import generate_access_token, generate_refresh_token
from rest_framework.permissions import AllowAny
import datetime
from django.conf import settings
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from .utils import decode_token, generate_tokens_response, generat_qr_code, verify2faCode
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import AnonymousUser
from rest_framework.exceptions import AuthenticationFailed
import json
from io import BytesIO
from django.core.files import File


from django.contrib.auth import login
from rest_framework.decorators import api_view, permission_classes
import requests
@api_view(['POST'])
@permission_classes([AllowAny])
def LoginWithOAuth42(request):
    code = request.data.get('code')
    
    client_id = 'u-s4t2ud-70dc836346e26f4efb68c4811174ea4d330c4830fa5ddcb7a61e415640aa7041'
    client_secret = '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'
    redirect_uri = 'https://localhost/login/'

    token_url = 'https://api.intra.42.fr/oauth/token'
    user_info_url = 'https://api.intra.42.fr/v2/me'

    payload = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_uri': redirect_uri,
    }
    print(payload)
    # Exchange the code for an access token
    response = requests.post(token_url, data=payload)
    print(response)
    if response.status_code != 200:
        return Response({'error': 'Failed to retrieve access token'}, status=400)
    
    access_token = response.json().get('access_token')

    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    user_info_response = requests.get(user_info_url, headers=headers)
    if user_info_response.status_code != 200:
        return Response({'error': 'Failed to retrieve user info'}, status=400)

    user_info = user_info_response.json()
   
    login_42 = user_info.get('login')
    email = user_info.get('email')
    first_name = user_info.get('first_name')
    last_name = user_info.get('last_name')
    responseImage = requests.get(user_info["image"]["versions"]["medium"])
    if responseImage.status_code == 200:
        profile_pic = File(BytesIO(responseImage.content), name=f"{login_42}_profile_pic.jpg")
    else:
        profile_pic = None
    try:
        user = MyUser.objects.get(login=login_42)
       
        resp = generate_tokens_response(user, request)
        return resp
    except MyUser.DoesNotExist:

        user = MyUser.objects.create_user(
            login=login_42,
            email=email,
            firstName=first_name,
            lastName=last_name,
            oauth=True
        )
        if profile_pic:
            user.profile_pic.save(f"{login_42}_profile_pic.jpg",profile_pic)

        resp = generate_tokens_response(user, request)
        return resp

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        identifier = self.kwargs.get('identifier')
        if identifier.isdigit():
            return get_object_or_404(MyUser, pk=identifier)
        else:
            return get_object_or_404(MyUser, login=identifier)

# class UserAPICreate(generics.CreateAPIView):
#     queryset = MyUser.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]
    

# class UserListAPIView(generics.ListAPIView):
#     queryset = MyUser.objects.all()
#     serializer_class = UserSerializer
class GetUsers(APIView):
    def get(self, request):
        users = MyUser.objects.all()
        serializer = PublicUserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class getPublicUser(APIView):
    permission_classes = [AllowAny]
    def get(self, request,*args, **kwargs):
        identifier = self.kwargs.get('identifier')
        try:
            if identifier.isdigit():
                user = MyUser.objects.get(pk=identifier)
            else:
                user = MyUser.objects.get(login=identifier)
        except MyUser.DoesNotExist:
                return Response({
                    'message': 'User not found'
                }, status=404)
        serializer = PublicUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class getAuthenticatedUser(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            user = serializer.update(instance=user, validated_data=serializer.validated_data)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
        

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        if not isinstance(request.user, AnonymousUser):
            return Response({
                'message': 'user already logged in'
            }, status=status.HTTP_200_OK)
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            resp = generate_tokens_response(user, request)
            return resp
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

class UpdateUserData(APIView):
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            user = serializer.update(instance=user, validated_data=serializer.validated_data)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)
    
class RefreshToken(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        if not isinstance(request.user, AnonymousUser):
            return Response({
                'message': 'user already logged in'
            }, status=status.HTTP_200_OK)
        refreshToken = request.COOKIES.get('refresh_token')
        try:
            if not refreshToken:
                raise PermissionDenied('Refresh Token not provided')
            payload = decode_token(refreshToken)
            if payload == 0:
                raise PermissionDenied('Expired token')
            elif payload == -1:
                raise PermissionDenied('Invalid token')
            try:
                user = MyUser.objects.get(id=payload['user_id'])
                access_token = generate_access_token(user)
                resp = Response({
                    'message': 'access token refreshed'
                }, status=status.HTTP_200_OK)
                resp.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    samesite='Lax'
                )
                # resp.headers['csrf_token'] = csrf_token
                return resp
            except MyUser.DoesNotExist:
                raise PermissionDenied('User not found')
        except Exception as e:
            return Response(e, status=status.HTTP_401_UNAUTHORIZED)
            
            
class CheckAuth(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        csrf_token  = request.headers.get('X-CSRFToken')
        csrf_cookie = request.COOKIES.get('csrftoken')
        if not isinstance(request.user, AnonymousUser):
            # if not csrf_token or not csrf_cookie:
            #     return Response({
            #         'message': 'invalid csrf credentials'
            #     }, status=status.HTTP_401_UNAUTHORIZED)
            # elif csrf_cookie != csrf_token:
            #     return Response({
            #         'message': 'csrf_token mismatch'
            #     }, status=status.HTTP_401_UNAUTHORIZED)
            # else:
                return Response({
                    'message': 'user already logged in'
                }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Anonymous user'
            }, status=status.HTTP_200_OK)
# @sensitive_post_parameters()
# @require_http_methods(["POST"])
# @csrf_protect
# @api_view(['POST'])
# def MyLogin(request):
#     if request.method == 'POST':
#         form  = AuthenticationForm(request, data=request.POST)
#         if form.is_valid():
#             user = form.get_user()
#             auth_login(request, user)
#             return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
#         else :
#             return Response({'Error': 'Invalide user credentials!'}, status=status.HTTP_401_UNAUTHORIZED) 
#     else:
#         return  Response({'Error': 'This path only accept POST request!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# class CheckAuthentication(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticated]
#     def get(request, *arg, **kwarg):
#         return JsonResponse({'IsAuthenticated': True})

# def getCRSFToken(request):
#         csrf_token = get_token(request)
#         return JsonResponse({'csrfToken': csrf_token})

class UploadProfilePicture(APIView):
    def patch(self, request, *args, **kwargs):
        try:
            user = get_object_or_404(MyUser, login=request.user)
            serializer = UserSerializer(instance=user, data=request.data)
            if serializer.is_valid():
                if not user.isDefaultImage():
                    os.remove('media/' + user.profile_pic.name)  
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)} , status=status.HTTP_400_BAD_REQUEST)

class UserNotification(generics.ListAPIView):
    serializer_class = NotificationSerializer
    def get_queryset(self):
        user=self.request.user
        return Notification.objects.filter(id_user_fk=user).order_by('created')


class GenerateQRCodeView(APIView):
    def get(self, request):
        user = request.user
        resp = generat_qr_code(user)
        return resp

class Enable2faView(APIView):
    def post(self, request):
        code = request.data.get('otp_code')
        user = request.user
        if verify2faCode(user, code):
            if user.two_factor_auth == False:
                user.two_factor_auth = True
                user.save()
                return Response({
                    'message' : 'Two Factory Authentication enabled succefully'
                }, status=200)
            else:
                return Response({
                    'message' : 'Two Factory Authentication already enabled'
                }, status=200)
        return Response({
            'message' : 'Invalid OTP'
        }, status=400)
        
class Verify2faOTPView(APIView):
    def post(self, request):
        code = request.data.get('otp_code')
        user = request.user
        if verify2faCode(user, code):
            return Response({
                'message' : 'OTP verified'
            }, status=200)
        return Response({
            'message' : 'Invalid OTP'
        }, status=400)

            
        



