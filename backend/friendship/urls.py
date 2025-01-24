from django.urls import path
from .views import FriendRequestList, AcceptFriendRequest, BlockUser, UnFriendUser, isBlocked, UnBlockUser,FriendRequestSentList, FriendRequestReceivedList, isFriend, FriendRequestStatus, CancelFriendRequest, FriendsList,GetBlockList, isBlockedRelationship, defineStatusOfBlocker
urlpatterns = [
   path("requests/", FriendRequestList.as_view(), name='listfriendRequest'),
   path("request/status/set/accept/<int:id>", AcceptFriendRequest, name="FirendRequest"),
   path("request/status/set/cancel/<int:id>", CancelFriendRequest, name="cancelFirendRequest"),
   path("block/<str:_login>", BlockUser ,name="BlockUser"),
   path("unblock/<str:_login>", UnBlockUser, name='UnBlockUser'),
   path("unfriend/<str:_login>", UnFriendUser ,name="Unfriend"),
   path("is/BLOCKED/<str:_login>", isBlocked, name='isBlocked'),
   path("is/BLOCKED_BOTH_SIDE/<str:_login>", isBlockedRelationship, name='isBlocked_both_side'),
   path("is/FRIEND/<str:_login>", isFriend, name='isFriend'),
   path("status/<str:_login>", FriendRequestStatus, name="friendrequeststatus"),
   path("friend_requests_sent/", FriendRequestSentList, name="friend_requests_sent"),
   path("friend_requests_received/", FriendRequestReceivedList, name="friend_requests_received"),
   path("friend_list/", FriendsList, name="friend_list"),
   path("block_list/", GetBlockList, name="block_list"),
   path("block_status/<str:_login>", defineStatusOfBlocker, name="block_status"),
]
