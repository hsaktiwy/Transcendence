from django.urls import path
from .views import (
    UserRetrieveUpdateDestroyAPIView, 
    UserAPICreate, 
    UserListAPIView, 
    CheckAuthentication, 
    UploadProfilePicture, 
    UserNotification,
    LoginWithOAuth42  # Import the exchange_code view
)

urlpatterns = [
    path('users/', UserListAPIView.as_view(), name="Access_Users"),
    path('user/<int:pk>/notification/', UserNotification.as_view(), name="User_Notification"),
    path('user/<identifier>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('user/<int:pk>/upload_pic/', UploadProfilePicture.as_view(), name="upload_profile"),
    path('user/create/', UserAPICreate.as_view(), name="Add_Users"),
    path('session/', CheckAuthentication.as_view(), name="User_Access"),
    path('LoginWithOAuth42/', LoginWithOAuth42, name="LoginWithOAuth42"),  # New path for exchanging code
]
