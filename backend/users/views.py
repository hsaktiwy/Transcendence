#from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer
from .models import MyUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.http import JsonResponse
from django.middleware.csrf import get_token
# Create your views here.
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserAPICreate(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserListAPIView(generics.ListAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class CheckAuthentication(APIView):
    permission_classes = [IsAuthenticated]
    def get(request, *arg, **kwarg):
        return JsonResponse({'IsAuthenticated': True})

def getCRSFToken(request):
        csrf_token = get_token(request)
        return JsonResponse({'csrfToken': csrf_token})
