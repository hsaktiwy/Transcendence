from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
from django.conf import settings
import traceback


class DebuginMidleware(MiddlewareMixin):    
    def process_request(self, request):
        print(request.META)
        print(request.META.get("HTTP_HOST"))
        print(request.META.get("X-Real-IP"))
        print(request.META.get("X-Forwarded-For"))
        print(request.META.get("REMOTE_ADDR"))