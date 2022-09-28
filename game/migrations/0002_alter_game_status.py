# Generated by Django 4.0 on 2022-07-24 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='status',
            field=models.CharField(choices=[('A', 'Active'), ('W', 'Win'), ('D', 'Defeat')], default='A', max_length=1),
        ),
    ]
