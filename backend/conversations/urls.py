from django.urls import path
from .views import ConversationAPIVIEW, ConversationUpdateAPIVIEW, Get_channel_id, get_conversation

urlpatterns = [
    path('conversations/<int:packetSize>/', ConversationAPIVIEW.as_view(), name="get_conversations"),
    path('conversations/update/<int:channelId>/<int:packetSize>/<int:packetToAdd>/', ConversationUpdateAPIVIEW.as_view(), name="conversationsUpdate"),
    path('conversation/<int:channelId>/<int:packetSize>/', get_conversation, name="get_conversation"),
    path('conversation/get_channel/<str:uuid>/', Get_channel_id, name="get_channel"),
]