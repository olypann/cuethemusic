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

    print('проверка вьюшки')

    if request.method == 'GET':
        print('проверка вьюшки до апи')
        print('вьюшка')
        print(room_name)
        game_data = requests.get(f'http://127.0.0.1:8000/api/game/{room_name}')
        game_data = game_data.json()
        print("pleaseee")
        print(game_data)

        print('проверка вьюшки после апи')
        return render(request, 'game/game.html', context={'game': game_data, 'room_name': room_name})


# def game_view(request, game_id):
#     print('проверка вьюшки')
#     """
#     Если метод запроса это post(если функция принимает отправленное слово),
#     то достаются параметры данного слова(пользователь и само слово) из api используя вьюшку GameWordView
#     """
    
#     if request.method == 'GET':
#         print('проверка вьюшки до апи')
#         print('вьюшка')
#         print(game_id)
#         game_data = requests.get(f'http://127.0.0.1:8000/api/game/{game_id}')
#         game_data = game_data.json()
#         print(game_data)

#         print('проверка вьюшки после апи')
#         # print(json.dumps(game_data, indent=4))
#         return render(request, 'game/game.html', context={'data': game_data})



class NewGameView(APIView):
    def post(self, request):
        print('waiting class 2')
        try:
            
            print('oop')
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


# Создаем вьюшку ответственную за получение списка слов от обоих пользователей
class GameView(APIView):
    #Создаем функцию get которая принимает на вход id игры и контекст в виде request и с помощью этого достает слова для каждого игрока
    def get(self, request, game_id):
        print('проверка апи')
        print('класс')
        print(game_id)
        try:
            # game_id = request.query_params.get('game_id')
            # создаем список с одним элементом игры, так как только у одной может быть подходящий id
            game = Game.objects.filter(id=game_id)
            #Если в этом списке есть игра(если такая игра нашлась)
            if game:

                serializer = GameSerializer(game[0], context={'request': request})
                
                response = serializer.data
                

                return Response(response)

            return Response({'status': 'error',
                             'error': 'game with id {} not found'.format(game_id)})

        except Exception as e:
            return Response({'status': 'error',
                             'error': str(e)})

    