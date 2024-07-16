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
from django.urls import path, include
from users.views import getCRSFToken
urlpatterns = [
    # this was here by defalt gave us grafical admin interface only for users assogne in django default users exemple (hsaktiwy, 1234)<- super user in production level #DestroyThis
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
    path('csrftoken/', getCRSFToken, name='csrftoken_set'),
    #users app
    path('api/', include('users.urls')),
    #channel app
    path('chat/', include('channels.urls')),
    # #status app
    #     #Notifications
    path('profile/', include('status.urls')),
    # #friendship app
    path('friendship/', include('friendship.urls')),
    # #Game
    path('game/', include('game.urls')),
    # #Game Invitation
    path('invitation/', include('invitation.urls'))
]
