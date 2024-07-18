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
