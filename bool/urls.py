"""bool URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from accounts.views import *
from dashboard.views import *
from game.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', signup_view, name='sign up'),
    path('login/', login_view, name='login'),
    path('', choice_view, name='choice'),
    path('logout/', logout_view),
    path('dashboard/', dashboard_view, name='dashboard'),

    # path('api/game/<str:game_id>/', GameView.as_view()),
    # path('api/game/', NewGameView.as_view()),
    # path('game/<str:game_id>/', new_game_view, name='game'),

    path('api/game/', NewGameView.as_view()),
    path('api/game/<str:game_id>/', GameView.as_view()),
    # path('api/gameover/<str:game_id>/', GameOverView.as_view()),
    path('game/<str:room_name>/', room_view, name='room'),
    

]





