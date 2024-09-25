# from django.urls import path
# from .views import UserRetrieveUpdateDestroyAPIView, UserAPICreate, UserListAPIView, CheckAuthentication, UploadProfilePicture, UserNotification


# urlpatterns = [
#     path('users/', UserListAPIView.as_view(), name="Access_Users"),
#     path('user/<int:pk>/notification/', UserNotification.as_view(), name="User_Notification"),
#     path('user/<identifier>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
#     path('user/<int:pk>/upload_pic/', UploadProfilePicture.as_view(), name="upload_profile"),
#     path('user/create/', UserAPICreate.as_view(), name="Add_Users"),
#     path('session/',CheckAuthentication.as_view(), name="User_Access"),
# ]

from . import views
from django.urls import path



urlpatterns = [
    path('users/', views.GetUsers.as_view()),
    path('user/login/', views.LoginView.as_view()),
    path('users/<identifier>/', views.UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('user/register/', views.RegisterView.as_view()),
    path('user/', views.getAuthenticatedUser.as_view()),
    path('user/refresh_token/', views.RefreshToken.as_view()),
    path('user/notification/', views.UserNotification.as_view(), name="User_Notification"),
    path('user/check/', views.CheckAuth.as_view()),
    # path('login/', views.LoginView.as_view())
]
