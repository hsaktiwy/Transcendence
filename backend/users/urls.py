from django.urls import path
from .views import UserRetrieveUpdateDestroyAPIView, UserAPICreate, UserListAPIView, CheckAuthentication, UploadProfilePicture


urlpatterns = [
    path('users/', UserListAPIView.as_view(), name="Access_Users"),
    path('user/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('user/<int:pk>/upload_pic/', UploadProfilePicture.as_view(), name="upload_profile"),
    path('user/create/', UserAPICreate.as_view(), name="Add_Users"),
    path('session/',CheckAuthentication.as_view(), name="User_Access"),
]
