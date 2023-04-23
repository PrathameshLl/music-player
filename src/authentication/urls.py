from django.contrib import admin
from django.urls import path,include
from . import views


urlpatterns = [
    path('', views.auth,name="auth_user"),
    path('signup', views.signup,name="signup"),
    path('signupuser', views.signupUser,name="signupUser"),
    path('signin', views.login_page,name="login"),
    path('signinuser', views.login_user,name="login"),
    path('signout', views.signout,name="signout"),
    
]
