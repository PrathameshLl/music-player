from django.shortcuts import render

v = 10
def home(request):
    return render(request,"music_player/home.html")


def vikrant(request):
    return render(request,"music_player/v.html")
