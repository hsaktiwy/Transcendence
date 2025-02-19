from django.urls import path
from .views import get_match_history

urlpatterns = [
    path('get_matches/<str:uuid>/', get_match_history, name="get_last_matches")
]
