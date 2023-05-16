from django.urls import path,include
from . import views;

urlpatterns = [
    path('upload', views.uploadSong,name="uploadSong"),
    path('getSongs', views.getSongs,name="uploadSong"),
    path("createplaylist",views.createPlaylist,name="createPlaylist"),
    path("getplaylistlist",views.getPlaylistList,name="getPlaylistList"),
    path("getplaylists",views.getPlaylists,name="getPlaylists"),
    path("getplaylist",views.getPlaylist,name="getPlaylist"),
    path("addsongtoplaylist",views.addSongToPlaylist,name="addSongToPlaylist"),
    path("searchsongs",views.searchSongs,name="searchSongs")
    # path("/music/playlistpictureupload",views.uploadPlaylistCover,name="")
]
