from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Album(models.Model):
    name = models.CharField(max_length=500)
    artist = models.CharField(max_length=500)
    release_date = models.DateField()
    album_art = models.CharField(max_length=10000)
    def __str__(self):
        return f"{self.name} by {self.artist}"


class Song(models.Model):
    name = models.CharField(max_length=500)
    file = models.FileField(upload_to="songs")
    artist = models.CharField(max_length=500)
    album = models.ForeignKey(Album,related_name="albums",on_delete=models.CASCADE)
    published = models.ForeignKey(User,related_name="songs",on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} by {self.artist}"



class Playlist(models.Model):
    name = models.CharField(max_length=500)
    user = models.ForeignKey(User,related_name="playlists",on_delete=models.CASCADE)
    description = models.CharField(max_length=500)
    cover = models.ImageField(upload_to="playlist_cover",default="playlist_cover/defaultPlaylistCover.jpg")
    songs = models.ManyToManyField(Song,related_name="playlist_set")



    