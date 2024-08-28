from django.urls import path
from .views import NotificationRetrieveUpdateDestroyAPIView, NotificationAPICreate, ProfileStatusRetrieveUpdateDestroyAPIView, ProfileStatusAPICreate

urlpatterns = [
    #     #Notifications
    path('notification/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name="Access_Notification"),
    path('notification/create/', NotificationAPICreate.as_view(), name="Add_Notification"),
    #     #ProfileStatus
    path('status/<int:pk>/', ProfileStatusRetrieveUpdateDestroyAPIView.as_view(), name="Access_ProfileStatus"),
    path('status/create/', ProfileStatusAPICreate.as_view(), name="Add_ProfileStatus"),
]
