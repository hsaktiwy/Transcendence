from django.urls import path
from .views import UserRetrieveUpdateDestroyAPIView, UserAPICreate, UserListAPIView, CheckAuthentication

urlpatterns = [
    path('users/', UserListAPIView.as_view(), name="Access_Users"),
    path('user/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('user/create/', UserAPICreate.as_view(), name="Add_Users"),
    path('user/session/',CheckAuthentication.as_view(), name="User_Access"),
]
