from django.urls import path,include
from . import views;

urlpatterns = [
    path('/upload', views.uploadSong,name="uploadSong"),
    path('/getSongs', views.getSongs,name="uploadSong"),
    path("/createplaylist",views.createPlaylist,name="createPlaylist")
]
