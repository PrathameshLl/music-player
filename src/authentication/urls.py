from django.contrib import admin
from django.urls import path,include
from . import views


urlpatterns = [
    path('', views.auth,name="auth_user"),
    path('signin', views.login,name="login"),
]
