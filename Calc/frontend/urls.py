from . import views
from django.urls import path

urlpatterns = [
    path("", views.Calc, name="calc"),
    path("login/", views.user_login, name="login"),
    path("sign_up/", views.sign_up, name="signup"),
    path("logout/", views.user_logout, name="logout user")
]