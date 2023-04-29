from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Artist(models.Model):
    name = models.CharField(max_length=500) 

class Album(models.Model):
    name = models.CharField(max_length=500)
    artist = models.ForeignKey(Artist,related_name="albums",on_delete=models.CASCADE)
    release_date = models.DateField()


class Song(models.Model):
    name = models.CharField(max_length=500)
    file = models.FileField(upload_to="songs")
    album_art = models.ImageField(upload_to="album_cover")
    artist =  models.ForeignKey(Artist,related_name="songs",on_delete=models.CASCADE)
    album = models.ForeignKey(Album,related_name="albums",on_delete=models.CASCADE)
    published = models.ForeignKey(User,related_name="songs",on_delete=models.CASCADE)



class Playlist(models.Model):
    name = models.CharField(max_length=500)
    user = models.ForeignKey(User,related_name="playlists",on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    cover = models.ImageField(upload_to="playlist_cover",default="playlist_cover/defaultPlaylistCover.jpg")



    