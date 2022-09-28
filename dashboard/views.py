from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.shortcuts import render, redirect
from django.http import HttpResponse
from game.models import *


# @login_required(login_url='login')
def dashboard_view(request):
    profile = Profile.objects.get(user=request.user)
    context = {}
    won = Game.objects.filter(status='W').order_by('-id')
    defeated = Game.objects.filter(status='D').order_by('-id')
    active = Game.objects.filter(status='A').order_by('-id')

    context = {'defeated_games': defeated, 'active_games': active, 'won_games': won, 'user': profile.user.username, 'user_id': profile.user.id}
    return render(request, 'dashboard/home.html', context=context)

# 'username': profile.user.username, 'user_id': profile.user.id

