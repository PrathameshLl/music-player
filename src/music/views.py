from django.shortcuts import render, HttpResponse
from .models import Song, Album 
from datetime import datetime
import json




# Create your views here.
def uploadSong(reqeust):
    if reqeust.method == "POST":
        song_file = reqeust.FILES["file"]
        song_title = reqeust.POST.get("title")
        artist_name = reqeust.POST.get("artist_name")
        album_name = reqeust.POST.get("album_name")
        album_cover = reqeust.POST.get("album_cover")
        release_date = reqeust.POST.get("release_date")
        album_release_date = None
        if release_date != "null":
            album_release_date = datetime.strptime(release_date,"%B %d, %Y").date()

        if Album.objects.filter(name=album_name,artist=artist_name):
            album = Album.objects.filter(name=album_name,artist=artist_name)[0]
            if Song.objects.filter(name=song_title,artist=artist_name):
                return HttpResponse(json.dumps({"status":"failed","message":"song already exist"}))

            song = Song.objects.create(name=song_title,file=song_file,artist=artist_name,album=album,published=reqeust.user)
            song.save()
        else:
            album = Album.objects.create(name=album_name,artist=artist_name,album_art=album_cover,release_date=album_release_date)
            album.save()
            song = Song.objects.create(name=song_title,file=song_file,artist=artist_name,album=album,published=reqeust.user)
            song.save()
            obj = {
                "id": song.id,
                "name": song.name,
                "artist": song.artist,
                "url": song.file.url,
                "cover_art_url":song.album.album_art,
                "album": song.album.name,
            }
        return HttpResponse(json.dumps({"status":"success","message":"uploaded the song","song":obj}),reqeust)

    return render(reqeust,"error.html")




def getSongs(request):
    if request.method =="POST":
        songs = Song.objects.all()
        res_songs = []
        for song in songs:
            obj = {
                "id": song.id,
                "name": song.name,
                "artist": song.artist,
                "url": song.file.url,
                "cover_art_url":song.album.album_art,
                "album": song.album.name,
            }
            res_songs.append(obj)

        print(res_songs)
        return HttpResponse(json.dumps({"status":"","message":"succefull","songs":res_songs}))
    return render(request,"error.html")

