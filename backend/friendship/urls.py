from django.urls import path
from .views import FriendRequestList, AcceptFriendRequest, BlockUser, UnFriendUser, isBlocked, UnBlockUser,FriendRequestSentList
urlpatterns = [
   path("requests/", FriendRequestList.as_view(), name='listfriendRequest'),
   path("request/status/set/accept/<int:id>", AcceptFriendRequest, name="FirendRequest"),
   path("block/<str:_login>", BlockUser ,name="BlockUser"),
   path("unblock/<str:_login>", UnBlockUser, name='UnBlockUser'),
   path("unfriend/<str:_login>", UnFriendUser ,name="Unfriend"),
   path("is/BLOCKED/<str:_login>", isBlocked, name='isBlocked'),
   path("friend_requests_sent/", FriendRequestSentList.as_view(), name="friend_requests_sent")
]
