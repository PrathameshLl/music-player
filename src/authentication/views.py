from django.shortcuts import render,redirect

# Create your views here.
def auth(request):
    return render(request,"authentication/signup.html")

def login(request):
    return render(request,"authentication/signin.html")