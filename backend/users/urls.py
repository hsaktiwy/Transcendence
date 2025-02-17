from . import views
from django.urls import path



urlpatterns = [
    path('users/<identifier>/', views.getPublicUser.as_view(), name="Access_User"),
    path('user/', views.getAuthenticatedUser.as_view()),
    path('user/search/',views.Search, name="Search"),
    path('user/logout/',views.LogoutView, name="Logout"),
    path('user/login/', views.LoginView.as_view()),
    path('user/register/', views.RegisterView.as_view()),
    path('user/refresh_token/', views.RefreshToken.as_view()),
    path('user/notification/', views.UserNotification.as_view(), name="User_Notification"),
    path('user/check/', views.CheckAuth.as_view()),
    path('user/getqrcode/', views.GenerateQRCodeView.as_view(), name="generate_qr_code"),
    path('user/enable2fa/', views.Enable2faView.as_view(), name="enable_2fa"),
    path('user/verify2fa/', views.Verify2faOTPView.as_view(), name="verify_2fa"),
    path('user/upload_pic/', views.UploadProfilePicture.as_view(), name="upload_profile"),
    path('user/CoverProfile/', views.UploadCoverProfile, name="cover_profile"),
    path('LoginWithOAuth42/', views.LoginWithOAuth42, name="LoginWithOAuth42"),
    path('setusername/', views.SetUsername, name="set_username")
]
