# -*- coding: utf-8 -*-

from django.urls import path
from django.conf import settings

from website import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('list', views.OtpListView.as_view(), name='list'),
    path('add', views.OtpAddView.as_view(), name='add')
]
