from django.contrib import admin
from django.urls import path,include
from . import views


urlpatterns = [
    path('', views.auth,name="auth_user"),
    path('signup', views.signup,name="signup"),
    path('signin', views.login,name="login"),
    path('signupuser', views.signupUser,name="signupUser"),
    path('signout', views.signout,name="signout"),
    
]
