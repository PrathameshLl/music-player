from django.shortcuts import render,redirect
from django.contrib.auth.models import User
# Create your views here.

def auth(request):
    if request.user.is_authenticated:
        return render(request,"music_player/home.html")
    return redirect("/signup")

def signup(reqeust):
    return render(reqeust,"authentication/signup.html")



def login(request):
    return render(request,"authentication/signin.html")


def signupUser(reqeust):
    pass