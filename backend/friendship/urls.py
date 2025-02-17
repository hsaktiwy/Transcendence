from django.urls import path
from .views import AcceptFriendRequest, BlockUser, UnFriendUser, isBlocked, UnBlockUser,FriendRequestSentList, FriendRequestReceivedList, isFriend, FriendRequestStatus, CancelFriendRequest, FriendsList,GetBlockList, isBlockedRelationship, defineStatusOfBlocker
urlpatterns = [
   path("request/status/set/accept/<int:id>", AcceptFriendRequest, name="FirendRequest"),
   path("request/status/set/cancel/<int:id>", CancelFriendRequest, name="cancelFirendRequest"),
   path("block/<str:unique_id>", BlockUser ,name="BlockUser"),
   path("unblock/<str:unique_id>", UnBlockUser, name='UnBlockUser'),
   path("unfriend/<str:unique_id>", UnFriendUser ,name="Unfriend"),
   path("is/BLOCKED/<str:unique_id>", isBlocked, name='isBlocked'),
   path("is/BLOCKED_BOTH_SIDE/<str:uuid>", isBlockedRelationship, name='isBlocked_both_side'),
   path("is/FRIEND/<str:uuid>", isFriend, name='isFriend'),
   path("status/<str:uuid>", FriendRequestStatus, name="friendrequeststatus"),
   path("friend_requests_sent/", FriendRequestSentList, name="friend_requests_sent"),
   path("friend_requests_received/", FriendRequestReceivedList, name="friend_requests_received"),
   path("friend_list/", FriendsList, name="friend_list"),
   path("block_list/", GetBlockList, name="block_list"),
   path("block_status/<str:uuid>", defineStatusOfBlocker, name="block_status"),
]
