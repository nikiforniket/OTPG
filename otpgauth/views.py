# -*- coding: utf-8 -*-

from django.shortcuts import (render,
                              redirect)
from django.views import View
from django.utils import timezone
from django.http import Http404
from django.contrib.auth import (authenticate,
                                 login,
                                 logout)
from django.contrib.auth.models import User


class LoginView(View):

    template_name = 'auth/login.html'

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('website:home')
        else:
            return render(request, self.template_name)

    def post(self, request, *args, **kwargs):
        username, password = request.POST.get('username', None), request.POST.get('password', None)
        try:
            User.objects.get(username=username)
            user = authenticate(request,
                                username=username,
                                password=password)
            if user is not None:
                login(request, user)
                return redirect(self.request.GET.get('next', 'website:home'))
            else:
                return render(request,
                              self.template_name,
                              context={'password_error': 'Password entered is wrong.'},
                              status=400)
        except User.DoesNotExist:
            return render(request,
                          self.template_name,
                          context={'username_error': 'Username does not exist on our platform.'},
                          status=400)

class LogoutView(View):

    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('otpgauth:login')
