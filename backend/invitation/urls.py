from django.urls import path
from .views import SendGameInvitation, ChangeGameInvitationStatus, ListGameInvitation

urlpatterns = [
    path('list/', ListGameInvitation.as_view(), name="Access_GameInvitation"),
    path('send/<int:sender_id>/<int:receiver_id>', SendGameInvitation.as_view(), name="Send_GameInvitation"),
    path('change/status/<int:pk>/<str:Status>', ChangeGameInvitationStatus.as_view(), name="ChangeStatus_GameInvitation")
]
