#from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .models import MyUser


# Create your views here.
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

class UserAPICreate(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer