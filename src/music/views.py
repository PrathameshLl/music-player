from django.shortcuts import render, HttpResponse
from .models import Song, Album,Playlist
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

        return HttpResponse(json.dumps({"status":"","message":"succefull","songs":res_songs}))
    return render(request,"error.html")

def createPlaylist(request):
    if request.method == "POST":
        body = json.load(request)
        playlist = Playlist.objects.create(name=body["name"],user=request.user)
        playlist.save()
        return HttpResponse(json.dumps({"status":"success","message":"playlist created","playlist_name":playlist.name,"playlist_id":playlist.id}),request)
    return render(request,"error.html")



def getPlaylistList(request):
    if request.method == "POST":
        playlists = Playlist.objects.all()

        response = []
        for playlist in playlists:
            response.append({
                "id":playlist.id,
                "name": playlist.name,
                "description": playlist.description,
            })
        return HttpResponse(json.dumps(response))
    return render(request,"error.html")


def getPlaylists(request):
    if request.method == "POST":

        response = {}
        playlists = Playlist.objects.all()
        for playlist in playlists:
            songs = []
            for song in playlist.songs.all():
                songs.append(song.id)
            response[playlist.id] = {
                "title": playlist.name,
                "songs": songs
            }
            
        return HttpResponse(json.dumps(response))

    return render(request,"error.html")



def getPlaylist(request):
    if request.method == "POST":
        song_id = json.load(request)["song_id"]
        playlist = Playlist.objects.filter(id=song_id)[0]
        songs = []
        for song in playlist.songs.all():
            songs.append({
                "id":song.id,
                "name":song.name,
                "artist":song.artist,
                "cover": song.album.album_art,
            })

        playlist = {
            "id":playlist.id,
            "name": playlist.name,
            "description": playlist.description,
            "cover": playlist.cover.url,
            "songs": songs
        }
        return HttpResponse(json.dumps(playlist))
    return render(request,"error.html")


def searchSongs(request):

    if request.method == "POST":
        payload = json.load(request)
        print(payload)
        songs = Song.objects.filter(name__istartswith=payload["song_name"])
        response_songs = []
        for song in songs:
            response_songs.append({
                "id": song.id,
                "name": song.name,
                "artist": song.artist,
            })

        print(response_songs)
        return HttpResponse(json.dumps(response_songs))

    return render(request,"error.html")


def addSongToPlaylist(request):
    if request.method == "POST":
        payload = json.load(request)
        song = Song.objects.filter(id = payload["song_id"])[0]
        playlist = Playlist.objects.filter(id = payload["playlist_id"])[0]
        playlist.songs.add(song)
        return HttpResponse(json.dumps({"message": "hello"}))
    return render(request,"error.html")