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
from .serializers import UserSerializer, UserRegistrationSerializer, UserLoginSerializer
from .utils import generate_access_token, generate_refresh_token
from rest_framework.permissions import AllowAny

# Create your views here.
# class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):

#     queryset = MyUser.objects.all()
#     serializer_class = UserSerializer

#     def get_object(self):
#         identifier = self.kwargs.get('identifier')
#         if identifier.isdigit():
#             return get_object_or_404(MyUser, pk=identifier)
#         else:
#             return get_object_or_404(MyUser, login=identifier)

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
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class getAuthenticatedUser(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

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
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            access_token = generate_access_token(user)
            refresh_token = generate_refresh_token(user)
            return Response({
                'access': access_token,
                'refresh': refresh_token,
                'user' : user.id
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

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
    serializer_class = NotificationSerializer
    def get_queryset(self):
        user_id = self.kwargs.get('pk')
        return Notification.objects.filter(id_user_fk=user_id).order_by('created')



