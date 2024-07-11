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
# from channels.views import MessageRetrieveUpdateDestroyAPIView, MessageAPICreate, ChannelRetrieveUpdateDestroyAPIView, ChannelAPICreate
# from status.views import NotificationRetrieveUpdateDestroyAPIView, NotificationAPICreate, ProfileStatusRetrieveUpdateDestroyAPIView, ProfileStatusAPICreate
# from friendship.views import SendFriendRequest, AcceptFriendRequest, BlockFriendRequest, DeclineFriendRequest, DeleteFriendship, ListFriendRequests, ListFriends
# from game.views import ListGames, ListGamesWaiting, CreateGame, DestroyGame, ListGamesInProgress, ListGamesEnded, ChangeGameStatus
# from invitation.views import SendGameInvitation, ChangeGameInvitationStatus, ListGameInvitation

urlpatterns = [
    # this was here by defalt gave us grafical admin interface only for users assogne in django default users exemple (hsaktiwy, 1234)<- super user in production level #DestroyThis
    path('admin/', admin.site.urls),
    #users app
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('users/create/', UserAPICreate.as_view(), name="Add_Users"),
    #channel app
        # messages
    # path('messages/<int:pk>/', MessageRetrieveUpdateDestroyAPIView.as_view(), name="Access_Message"),
    # path('messages/create/', MessageAPICreate.as_view(), name="Add_Message"),
    #     #channels
    # path('channels/<int:pk>/', ChannelRetrieveUpdateDestroyAPIView.as_view(), name="Access_Channel"),
    # path('channels/create/', ChannelAPICreate.as_view(), name="Add_Channel"),
    # #status app
    #     #Notifications
    # path('notification/<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name="Access_Notification"),
    # path('notification/create/', NotificationAPICreate.as_view(), name="Add_Notification"),
    #     #ProfileStatus
    # path('ProfileStatus/<int:pk>/', ProfileStatusRetrieveUpdateDestroyAPIView.as_view(), name="Access_ProfileStatus"),
    # path('ProfileStatus/create/', ProfileStatusAPICreate.as_view(), name="Add_ProfileStatus"),
    # #friendship app
    # path('friendRequests/send/<int:user_id>/<int:friend_id>', SendFriendRequest.as_view(), name='send_friend_request'),
    # path('friendRequests/list/<int:user_id>/', ListFriendRequests.as_view(), name='list_friend_requests'),
    # path('friendRequests/listFriends/<int:user_id>/', ListFriends.as_view(), name='list_friends'),
    # path('friendRequests/accept/<int:pk>', AcceptFriendRequest.as_view(), name='accept_friend_request'),
    # path('friendRequests/block/<int:pk>', BlockFriendRequest.as_view(), name='block_friend_request'),
    # path('friendRequests/decline/<int:pk>', DeclineFriendRequest.as_view(), name='decline_friend_request'),
    # path('friendships/delete/<int:pk>', DeleteFriendship.as_view(), name='delete_friendship'),
    # #Game
    # path('games/create/', CreateGame.as_view(), name="Add_Game"),
    # path('games/list/', ListGames.as_view(), name="Access_Game"),
    # path('games/Delete/<int:pk>', DestroyGame.as_view(), name="Destroy_Game"),
    # path('games/waiting/', ListGamesWaiting.as_view(), name="Waiting_Games"),
    # path('games/inProgress/', ListGamesInProgress.as_view(), name="InProgress_Games"),
    # path('games/ended/', ListGamesEnded.as_view(), name="Ended_Games"),
    # path('games/change/status/<int:game_id>/<str:status_index>', ChangeGameStatus.as_view(), name="ChangeStatus_Games"),
    # #Game Invitation
    # path('invitation/list/', ListGameInvitation.as_view(), name="Access_GameInvitation"),
    # path('invitation/send/<int:sender_id>/<int:receiver_id>', SendGameInvitation.as_view(), name="Send_GameInvitation"),
    # path('invitation/change/status/<int:pk>/<str:Status>', ChangeGameInvitationStatus.as_view(), name="ChangeStatus_GameInvitation"),
]
