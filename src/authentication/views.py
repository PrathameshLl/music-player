from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import login , authenticate,logout 

# Create your views here.

def auth(request):
    if request.user.is_authenticated:
        return render(request,"music_player/home.html")
    
    return redirect("/signup")

def signup(reqeust):
    return render(reqeust,"authentication/signup.html")

def login_user(request):
    return render(request,"authentication/signin.html")

def signout(reqeust):
    logout(reqeust)
    return redirect("/")


def signupUser(reqeust):
    if reqeust.method == "POST":
        user_details = {
            "username" :reqeust.POST["username"],
            "email": reqeust.POST["email"],
            "password": reqeust.POST["password"],
        } 
        print(user_details)
        if User.objects.filter(username=user_details["username"]):
            messages.error(reqeust,f"username is already taken")
            return redirect("/")

        if User.objects.filter(email=user_details["email"]):
            messages.error(reqeust,f"username is already taken")
            return redirect("/")

        new_user = User.objects.create_user(username=user_details["username"],password=user_details["password"],email=user_details["email"])
        new_user.save()
        user = authenticate(username=user_details["username"],password=user_details["password"])
        login(reqeust,user)
            
        messages.success(reqeust,"signup succesfully")
        print("hiiiiiiiii")
        return redirect("/")

    return redirect("/")
        
        