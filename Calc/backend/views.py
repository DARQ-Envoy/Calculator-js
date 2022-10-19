from dis import Instruction
from django.shortcuts import render, redirect
from .models import Equation
from frontend.views import User
import datetime as dt
from django.http import HttpResponse, JsonResponse
from .engines import showequa
from django.contrib.auth.decorators import login_required

# Create your views here.
import json

@login_required(login_url='login')
def equation(request):
    print("request", request.method)
    if request.method == "POST":
        equations = {}
        add_equation = request.POST.get("equation")
        user = request.user
        Equ = add_equation.replace("p","+")
        equation = Equation(equation = Equ, user = user)
        equation.save()
        allequations = Equation.objects.filter(user = user)
        for equation in allequations:
            eq = {}
            eq["equation"] = equation.equation
            time = equation.created
            eq["date-created"] = str(time.date())
            equations[f"{equation.id}"]= eq
        result = json.dumps(equations)
        return HttpResponse(result)

    elif request.method == "GET":
        equations = {}
        user = request.user
        equation = Equation.objects.filter(user=user)
        instruction = request.GET.get("instruction")
        if(instruction == "clear"):
            for equa in equation:
                equa.delete()
            all_equations = Equation.objects.filter(user=user)
            data = json.dumps(showequa(all_equations))
            return HttpResponse(data)
        else:
            result = json.dumps(showequa(equation))
            return HttpResponse(result)
    
    return redirect(request.META.get('HTTP_REFERER'))


# bad Code - I want to source Json content out

# def equation(request):
#     print("request", request)
#     print("requestbody", request.content_type)
#     print("request methods", dir(request))
#     if request.method == "POST":
#         # print(JsonResponse(request.POST))
#         # print(dir(JsonResponse(request.POST)))
#         # value = JsonResponse(request.POST).serialize()
#         value = json.loads('request.POST')
#         print("value",value)
#         equations = {}
#         add_equation = request.POST.get("equation")
#         username = request.POST.get("username")
#         print("add_equation:", add_equation, "username:",username)
#     #     Equ = add_equation.replace("p","+")
#     #     user = User.objects.get(username=username)
#     #     equation = Equation(equation = Equ, user = user)
#     #     equation.save()
#     #     allequations = Equation.objects.filter(user = user)
#     #     for equation in allequations:
#     #         eq = {}
#     #         eq["equation"] = equation.equation
#     #         time = equation.created
#     #         eq["date-created"] = str(time.date())
#     #         equations[f"{equation.id}"]= eq
#     #     result = json.dumps(equations)
#     #     return HttpResponse(result)

#     # elif request.method == "GET":
#     #     print(User.objects.all())
#     #     equations = {}
#     #     username = request.GET.get("username")
#     #     user = User.objects.get(username = username)
#     #     equation = Equation.objects.filter(user=user)
#     #     instruction = request.GET.get("instruction")
#     #     if(instruction == "clear"):
#     #         for equa in equation:
#     #             print(equa)
#     #             equa.delete()
#     #         all_equations = Equation.objects.filter(user=user)
#     #         data = json.dumps(showequa(all_equations))
#     #         return HttpResponse(data)
#     #     else:
#     #         # for equa in equation:
#     #         #     eq = {}
#     #         #     eq["equation"] = equa.equation
#     #         #     time = equa.created
#     #         #     eq["date-created"] = str(time.date())
#     #         #     equations[f"{equa.id}"]= eq

#     #         result = json.dumps(showequa(equation))
#     #         return HttpResponse(result)
    
#     return redirect(request.META.get('HTTP_REFERER'))