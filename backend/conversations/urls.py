from django.urls import path
from .views import MessageRetrieveUpdateDestroyAPIView, MessageAPICreate, ChannelRetrieveUpdateDestroyAPIView, ChannelAPICreate

urlpatterns = [
    #message
    path('message/<int:pk>/', MessageRetrieveUpdateDestroyAPIView.as_view(), name="Access_Message"),
    path('message/create/', MessageAPICreate.as_view(), name="Add_Message"),
    #channels
    path('channel/<int:pk>/', ChannelRetrieveUpdateDestroyAPIView.as_view(), name="Access_Channel"),
    path('channel/create/', ChannelAPICreate.as_view(), name="Add_Channel")
]
