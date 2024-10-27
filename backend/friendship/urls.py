from django.urls import path
from .views import FriendRequestList, AcceptFriendRequest
urlpatterns = [
   path("requests/", FriendRequestList.as_view(), name='listfriendRequest'),
   path("request/status/set/accept/<int:id>", AcceptFriendRequest, name="FirendRequest")
]
