# -*- coding: utf-8 -*-

from django.shortcuts import (render,
                              redirect)
from django.views import View
from django.http import Http404
from django.contrib.auth.mixins import LoginRequiredMixin


class HomeView(LoginRequiredMixin,
               View):

    template_name = 'website/home.html'

    def get(self,
            request,
            *args,
            **kwargs):
        return render(request,
                      self.template_name,
                      status=200)
    

class OtpListView(LoginRequiredMixin,
                  View):

    template_name = 'website/otplist.html'

    def get(self,
            request,
            *args,
            **kwargs):
        return render(request,
                      self.template_name,
                      status=200)


class OtpAddView(LoginRequiredMixin, View):

    template_name = 'website/add.html'

    def get(self,
            request,
            *args,
            **kwargs):
        return render(request,
                      self.template_name,
                      status=200)
        
