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
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name="Access_User"),
    path('users/create/', UserAPICreate.as_view(), name="Add_Users"),
    path('messages/<int:pk>/', MessageRetrieveUpdateDestroyAPIView.as_view(), name="Access_Message"),
    path('messages/create/', MessageAPICreate.as_view(), name="Add_Message"),
    path('channels/<int:pk>/', ChannelRetrieveUpdateDestroyAPIView.as_view(), name="Access_Channel"),
    path('channels/create/', ChannelAPICreate.as_view(), name="Add_Channel"),
]
