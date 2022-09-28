from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_player = models.BooleanField(default=True)
    is_creator = models.BooleanField(default=False)
    is_validator = models.BooleanField(default=False)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username


class Status(models.TextChoices):
    ACTIVE = 'A', 'Active'
    PROCESSING = 'W', 'Win'
    FINISHED = 'D', 'Defeat'


class Game(models.Model):
    player = models.ForeignKey(Profile, related_name='player', on_delete=models.CASCADE)
    status = models.CharField(max_length=5, choices=Status.choices, default=Status.ACTIVE)

    def __str__(self):
        return str(self.player) + ', ' + str(self.status)


