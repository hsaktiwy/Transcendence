"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from users.views import UserRetrieveUpdateDestroyAPIView, UserAPICreate
from channels.views import MessageRetrieveUpdateDestroyAPIView, MessageAPICreate, ChannelRetrieveUpdateDestroyAPIView, ChannelAPICreate
from status.views import NotificationRetrieveUpdateDestroyAPIView, NotificationAPICreate, ProfileStatusRetrieveUpdateDestroyAPIView, ProfileStatusAPICreate
from friendship.views import SendFriendRequest, AcceptFriendRequest, BlockFriendRequest, DeclineFriendRequest, DeleteFriendship, ListFriendRequests, ListFriends

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('users/create/', UserAPICreate.as_view(), name="Add_Users"),
    path('messages/<int:pk>/', MessageRetrieveUpdateDestroyAPIView.as_view(), name="Access_Message"),
    path('messages/create/', MessageAPICreate.as_view(), name="Add_Message"),
    path('channels/<int:pk>/', ChannelRetrieveUpdateDestroyAPIView.as_view(), name="Access_Channel"),
    path('channels/create/', ChannelAPICreate.as_view(), name="Add_Channel"),
    path('notification/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name="Access_Notification"),
    path('notification/create/', NotificationAPICreate.as_view(), name="Add_Notification"),
    path('ProfileStatus/<int:pk>/', ProfileStatusRetrieveUpdateDestroyAPIView.as_view(), name="Access_ProfileStatus"),
    path('ProfileStatus/create/', ProfileStatusAPICreate.as_view(), name="Add_ProfileStatus"),
    path('sendFriendRequest/<int:user_id>/<int:friend_id>', SendFriendRequest.as_view(), name='send_friend_request'),
    path('listFriendRequests/<int:user_id>/', ListFriendRequests.as_view(), name='list_friend_requests'),
    path('listFriends/<int:user_id>/', ListFriends.as_view(), name='list_friends'),
    path('acceptFriendRequest/<int:pk>', AcceptFriendRequest.as_view(), name='accept_friend_request'),
    path('blockFriendRequest/<int:pk>', BlockFriendRequest.as_view(), name='block_friend_request'),
    path('declineFriendRequest/<int:pk>', DeclineFriendRequest.as_view(), name='decline_friend_request'),
    path('deleteFriendship/<int:pk>', DeleteFriendship.as_view(), name='delete_friendship'),
]
