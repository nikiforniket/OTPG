# -*- coding: utf-8 -*-

from rest_framework import (mixins,
                            viewsets,
                            status)
from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny)

from api.auth.serializers import (SignUpUserModelSerializer,)

from 

class SignUpModelViewSet(viewsets.GenericViewSet,
                         mixins.CreateModelMixin):

    queryset = 

