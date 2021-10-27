# -*- coding: utf-8 -*-

from rest_framework.serializers import (ModelSerializer,
                                        SerializerMethodField,
                                        DateTimeField)
from django.utils.auth.models import User


class SignUpUserModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email')

