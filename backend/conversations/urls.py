from django.urls import path
from .views import MessageRetrieveUpdateDestroyAPIView, MessageAPICreate, ChannelRetrieveUpdateDestroyAPIView, ChannelAPICreate, ConversationAPIVIEW, ConversationUpdateAPIVIEW

urlpatterns = [
    #message
    path('message/<int:pk>/', MessageRetrieveUpdateDestroyAPIView.as_view(), name="Access_Message"),
    path('message/create/', MessageAPICreate.as_view(), name="Add_Message"),
    #channels
    path('channel/<int:pk>/', ChannelRetrieveUpdateDestroyAPIView.as_view(), name="Access_Channel"),
    path('channel/create/', ChannelAPICreate.as_view(), name="Add_Channel"),
    path('conversations/<int:packetSize>/', ConversationAPIVIEW.as_view(), name="conversations"),
    path('conversations/update/<int:channelId>/<int:packetSize>/<int:packetToAdd>/', ConversationUpdateAPIVIEW.as_view(), name="conversationsUpdate")
]

#http://10.13.1.18:8000/chat/conversations/update/2/20/2/ 