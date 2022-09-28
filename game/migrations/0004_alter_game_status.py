# Generated by Django 4.0 on 2022-09-26 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_alter_game_player'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='status',
            field=models.CharField(choices=[('A', 'Active'), ('W', 'Win'), ('D', 'Defeat')], default='A', max_length=5),
        ),
    ]
