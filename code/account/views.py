from django.shortcuts import render, redirect
from django.contrib.auth import(
    authenticate,
    login,
    logout,
)

from .forms import LoginForm

def LoginView(request):
    if request.method == 'POST':
        form = LoginForm(request.POST or None)
        if form.is_valid():
            print("form validated")
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            print(form)
            user = authenticate(username=username,password=password)
            if not user:
                print("not user")
                return render(request,"accounts/registration/user_login.html",{'form':form})

            login(request,user)
            return redirect('/dashboard/')
    else:
         form = LoginForm()       
    return render(request,"accounts/registration/user_login.html",{'form':form})

def MobileLoginView(request):
    if request.method == 'POST':
        form = LoginForm(request.POST or None)
        if form.is_valid():
            print("form validated")
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            print(form)
            user = authenticate(username=username,password=password)
            if not user:
                print("not user")
                return render(request,"accounts/registration/user_login.html",{'form':form})

            login(request,user)
            return redirect('/mobile/')
    else:
         form = LoginForm()       
    return render(request,"accounts/registration/user_login.html",{'form':form})

def LogoutView(request):
    logout(request)
    return redirect('/dashboard/')

def MobileLogoutView(request):
    logout(request)
    return redirect('/mobile/')