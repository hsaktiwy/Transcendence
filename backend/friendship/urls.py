from django.urls import path
from .views import SendFriendRequest, AcceptFriendRequest, BlockFriendRequest, DeclineFriendRequest, DeleteFriendship, ListFriendRequests, ListFriends

urlpatterns = [
    path('request/send/<int:user_id>/<int:friend_id>', SendFriendRequest.as_view(), name='send_friend_request'),
    path('request/list/<int:user_id>/', ListFriendRequests.as_view(), name='list_friend_requests'),
    path('request/listFriends/<int:user_id>/', ListFriends.as_view(), name='list_friends'),
    path('request/accept/<int:pk>', AcceptFriendRequest.as_view(), name='accept_friend_request'),
    path('request/block/<int:pk>', BlockFriendRequest.as_view(), name='block_friend_request'),
    path('request/decline/<int:pk>', DeclineFriendRequest.as_view(), name='decline_friend_request'),
    path('delete/<int:pk>', DeleteFriendship.as_view(), name='delete_friendship'),
]
