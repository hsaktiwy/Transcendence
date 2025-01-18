from django.urls import path
from .views import ListGames, ListGamesWaiting, CreateGame, DestroyGame, ListGamesInProgress, ListGamesEnded, get_match_history, ChangeGameStatus

urlpatterns = [
    path('create/', CreateGame, name="Add_Game"),
    path('list/', ListGames.as_view(), name="Access_Game"),
    path('delete/<int:pk>', DestroyGame.as_view(), name="Destroy_Game"),
    path('waiting/', ListGamesWaiting.as_view(), name="Waiting_Games"),
    path('inProgress/', ListGamesInProgress.as_view(), name="InProgress_Games"),
    path('ended/', ListGamesEnded.as_view(), name="Ended_Games"),
    path('change/status/<int:game_id>/<str:status_index>', ChangeGameStatus.as_view(), name="ChangeStatus_Games"),
    path('get_matches/<str:type>', get_match_history, name="get_last_matches")
]
