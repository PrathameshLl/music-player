# Generated by Django 4.2 on 2023-05-01 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0004_remove_song_album_art_album_album_art'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='album_art',
        ),
    ]
