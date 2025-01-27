from django.urls import path
from .views import NotificationRetrieveUpdateDestroyAPIView, get_top_rank,NotificationAPICreate, ProfileStatusRetrieveUpdateDestroyAPIView, ProfileStatusAPICreate, get_Win_Lose, get_line_chart

urlpatterns = [
    #     #Notifications
    path('notification/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name="Access_Notification"),
    path('notification/create/', NotificationAPICreate.as_view(), name="Add_Notification"),
    #     #ProfileStatus
    path('status/<int:pk>/', ProfileStatusRetrieveUpdateDestroyAPIView.as_view(), name="Access_ProfileStatus"),
    path('status/create/', ProfileStatusAPICreate.as_view(), name="Add_ProfileStatus"),
    path('get_top_rank/', get_top_rank, name='get_top_rank'),
    path('get_win_lose/<str:_login>/', get_Win_Lose, name='get_win_lose'),
    path('get_line_chart/<str:_login>/', get_line_chart, name='get_line_chart')

]
