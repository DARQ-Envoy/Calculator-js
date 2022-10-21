from audioop import add
from dis import Instruction
from wsgiref.util import request_uri
from django.shortcuts import render, redirect
from .models import Equation
from frontend.views import User
import datetime as dt
from django.http import HttpResponse, JsonResponse
from .engines import showequa
from django.contrib.auth.decorators import login_required

# Create your views here.
# Checking if all requests are asynchronous
import json

@login_required(login_url='login')
def equation(request):
    
    if request.headers.get("X-Requested-With") == 'XMLHttpRequest':
        if request.method == "POST":
            equations = {}
            add_equation = json.load(request)["equation"]
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
            return JsonResponse(equations)

        elif request.method == "GET":
            equations = {}
            user = request.user
            equation = Equation.objects.filter(user=user)
            instruction = request.GET.get("instruction")
            if(instruction == "clear"):
                for equa in equation:
                    equa.delete()
                all_equations = Equation.objects.filter(user=user)
                return JsonResponse(showequa(all_equations))
            else:
                return JsonResponse(showequa(equation))
    
    return redirect(request.META.get('HTTP_REFERER'))