from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth  import authenticate,login, logout
from django.contrib import messages
from django.urls import reverse
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required(login_url='login')
def Calc(request):
    user = request.user
    context = {"username": user}
    return render(request, "frontend/index.html", context)


def sign_up(request):
    print(User.objects.all())
    context = {}
    if request.method == "POST":
        username = request.POST.get("password")
        password = request.POST.get("password")
        try:
            user = User.objects.create_user(username= username, password = password)
            user.save()
            login(request, user)
            return redirect(reverse("calc"))
        except:
            print("tim")
            context["info"] = "This username already exists."
    print(context)
    return render(request, "frontend/sign-up.html", context)



def user_login(request):
    context = {}
    print(request.method)
    if request.method == "POST" :
        username = request.POST.get("password")
        password = request.POST.get("password")
        auth_user = authenticate(request,username = username, password = password)
        context["shown"] = True
        if auth_user != None:
            login(request, auth_user)
            return redirect("/frontend/calc")
        else:
            messages.info(request, "Your username is incorrect.")
            context["username"] = username
            context["shown"] = True
            return render(request, "frontend/login.html", context)
    else:
        return render(request, "frontend/login.html", context)
        
def user_logout(request):
    logout(request)
    return redirect(reverse("login"))
