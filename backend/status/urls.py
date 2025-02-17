from django.urls import path
from .views import NotificationRetrieveUpdateDestroyAPIView, get_top_rank, ProfileStatusRetrieveUpdateDestroyAPIView, ProfileStatusAPICreate, get_Win_Lose, get_line_chart, get_achievements,get_Rank_User

urlpatterns = [
    path('notification/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name="Access_Notification"),
    path('status/<int:pk>/', ProfileStatusRetrieveUpdateDestroyAPIView.as_view(), name="Access_ProfileStatus"),
    path('status/create/', ProfileStatusAPICreate.as_view(), name="Add_ProfileStatus"),
    path('get_top_rank/', get_top_rank, name='get_top_rank'),
    path('get_achievements/<str:uuid>', get_achievements, name='get achievements'),
    path('get_win_lose/<str:uuid>/', get_Win_Lose, name='get_win_lose'),
    path('get_line_chart/<str:uuid>/', get_line_chart, name='get_line_chart'),
    path('get_rank_user/<str:uuid>/', get_Rank_User, name='get_Rank_User')
]
