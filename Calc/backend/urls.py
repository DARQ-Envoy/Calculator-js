from django.urls import path
from .import views

urlpatterns = [
    path("save_equation/", views.equation, name="equa-save")
]