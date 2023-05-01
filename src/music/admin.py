from django.contrib import admin
from .models import Album,Song,Playlist

# Register your models here.

admin.site.register([Album,Song,Playlist])