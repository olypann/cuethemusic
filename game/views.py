from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

import json
import datetime
from django.utils.timezone import now

from .models import *
from .serializers import *
import random
from django.http import HttpResponse
import requests
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


def room_view(request, room_name):

    if request.method == 'GET':
        print('checking before API')
        print(room_name)
        game_data = requests.get(f'http://127.0.0.1:8000/api/game/{room_name}')
        game_data = game_data.json()
        print(game_data)

        print('checking after API')
        return render(request, 'game/game.html', context={'game': game_data, 'room_name': room_name})



class NewGameView(APIView):
    def post(self, request):
        print('waiting class 2')
        try:
            print(request.data)
            user_id = request.data['user_id']
            print(user_id)
            user = Profile.objects.get(user=user_id)

            print(user)
            game = Game.objects.create(status='A', player=user)
            print(game)
            game_data = GameSerializer(game).data
            print(game_data)
            return Response(game_data, status=201)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=500)


class GameView(APIView):
    def get(self, request, game_id):
        print('Checking API')
        print(game_id)
        try:

            game = Game.objects.filter(id=game_id)
            if game:

                serializer = GameSerializer(game[0], context={'request': request})
                response = serializer.data

                return Response(response)

            return Response({'status': 'error',
                             'error': 'game with id {} not found'.format(game_id)})

        except Exception as e:
            return Response({'status': 'error',
                             'error': str(e)})

    