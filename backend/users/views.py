#from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer
from .models import MyUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.middleware.csrf import get_token
from rest_framework.response import Response
import os
# login
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.debug import sensitive_post_parameters
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import redirect
from rest_framework.decorators import api_view
from django.contrib.auth import login as auth_login
from django.views.decorators.http import require_http_methods
from django.shortcuts import get_object_or_404
import logging
from status.models import Notification
from status.serializers import NotificationSerializer
logger = logging.getLogger(__name__)

from rest_framework.permissions import AllowAny
# Create your views here.
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        identifier = self.kwargs.get('identifier')
        if identifier.isdigit():
            return get_object_or_404(MyUser, pk=identifier)
        else:
            return get_object_or_404(MyUser, login=identifier)

class UserAPICreate(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    

class UserListAPIView(generics.ListAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

@sensitive_post_parameters()
@require_http_methods(["POST"])
@csrf_protect
@api_view(['POST'])
def MyLogin(request):
    if request.method == 'POST':
        form  = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            return Response({'message': 'Login successful', 'user_id': user.id}, status=status.HTTP_200_OK)
        else :
            return Response({'Error': 'Invalide user credentials!'}, status=status.HTTP_401_UNAUTHORIZED) 
    else:
        return  Response({'Error': 'This path only accept POST request!'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class CheckAuthentication(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def get(request, *arg, **kwarg):
        return JsonResponse({'IsAuthenticated': True})

def getCRSFToken(request):
        csrf_token = get_token(request)
        return JsonResponse({'csrfToken': csrf_token})

class UploadProfilePicture(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        try:
            user = get_object_or_404(MyUser, login=request.user)
            print(request.data)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                if not user.isDefaultImage():
                    os.remove('media/' + user.profile_pic.name)  
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)} , status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserNotification(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    def get_queryset(self):
        user_id = self.kwargs.get('pk')
        return Notification.objects.filter(id_user_fk=user_id).order_by('created')



# import requests
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# @api_view(['POST'])
# def LoginWithOAuth42(request):
#     code = request.data.get('code')
#     client_id = 'u-s4t2ud-c6b6242240c2da879e3afe370e67288527613cf82675711a26a3e860f8cc74d0'
#     client_secret = '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'
#     redirect_uri = 'http://10.11.4.4:5173/login'
    
#     token_url = 'https://api.intra.42.fr/oauth/token'
    
#     payload = {
#         'grant_type': 'authorization_code',
#         'client_id': client_id,
#         'client_secret': client_secret,
#         'code': code,
#         'redirect_uri': redirect_uri,
#     }
    
#     token_response = requests.post(token_url, data=payload)
    
#     if token_response.status_code == 200:
#         access_token = token_response.json().get('access_token')

#         user_data_url = 'https://api.intra.42.fr/v2/me'
#         headers = {
#             'Authorization': f'Bearer {access_token}'
#         }
        
#         user_data_response = requests.get(user_data_url, headers=headers)
        
#         if user_data_response.status_code == 200:
#             user_data = user_data_response.json()
#             return Response(user_data)
#         else:
#             return Response({'error': 'Failed to fetch user data'}, status=user_data_response.status_code)
#     else:
#         return Response({'error': 'Failed to retrieve access token'}, status=token_response.status_code)

    


from django.contrib.auth import login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import MyUser
import requests

@api_view(['POST'])
def LoginWithOAuth42(request):
    code = request.data.get('code')

    client_id = 'u-s4t2ud-c6b6242240c2da879e3afe370e67288527613cf82675711a26a3e860f8cc74d0'
    client_secret = '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'
    redirect_uri = 'http://10.11.4.4:5173/login'

    token_url = 'https://api.intra.42.fr/oauth/token'
    user_info_url = 'https://api.intra.42.fr/v2/me'

    payload = {
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_uri': redirect_uri,
    }

    # Exchange the code for an access token
    response = requests.post(token_url, data=payload)
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
    birth_date = user_info.get('birthdate')

   
    try:
        user = MyUser.objects.get(login=login_42)
       
        login(request, user)
        return Response({'message': 'User logged in successfully'})
    except MyUser.DoesNotExist:

        user = MyUser.objects.create_user(
            login=login_42,
            email=email,
            firstName=first_name,
            lastName=last_name,
            birthDay=birth_date,
        )

      
        login(request, user)
        return Response({'message': 'User created and logged in successfully'})