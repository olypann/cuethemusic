from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'




class GameSerializer(serializers.ModelSerializer):
    player = ProfileSerializer()

    class Meta:
        model = Game
        # fields = ['id', 'player', 'status']
        fields = '__all__'