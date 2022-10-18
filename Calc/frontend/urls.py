from . import views
from django.urls import path

urlpatterns = [
    path("calc/", views.Calc, name="calc"),
    path("login/", views.user_login, name="login"),
    path("sign_up/", views.sign_up, name="signup")
]