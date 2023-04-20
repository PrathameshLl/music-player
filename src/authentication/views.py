from django.shortcuts import render,redirect

# Create your views here.
def auth(request):
    return render(request,"authentication/signup_in.html")

