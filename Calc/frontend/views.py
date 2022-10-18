from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth  import authenticate,login, logout
from django.contrib import messages
from django.urls import reverse



# Create your views here.
def Calc(request):
    print(request)
    user_id = request.GET.get("user_id")
    print(user_id)
    user = User.objects.get(id=user_id)
    print(user)
    context = {"username": user}
    return render(request, "frontend/index.html", context)


def sign_up(request):
    print(User.objects.all())
    context = {}
    if request.method == "POST":
        username = request.POST.get("password")
        password = request.POST.get("password")
        user = User.objects.create_user(username= username, password = password)
        user.save()
        print(user)
        return redirect(reverse("calc"),f"?user_id={user.id}")
    return render(request, "frontend/sign-up.html", context)



def user_login(request):
    context = {}
    print(request.method)
    if request.method == "POST" :
        username = request.POST.get("password")
        password = request.POST.get("password")
        print(password)
        auth_user = authenticate(request,username = username, password = password)
        print(auth_user)
        if auth_user != None:
            login(request, auth_user)
            print(auth_user.id)
            return redirect(f"/frontend/calc?user_id={auth_user.id}")
        else:
            messages.info(request, "Your username is incorrect.")
            context["username"] = username
            return render(request, "frontend/login.html", context)
    else:
        return render(request, "frontend/login.html", context)
        
