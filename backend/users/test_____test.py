from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponse
from django.conf import settings
import traceback


class DebuginMidleware(MiddlewareMixin):    
    def process_request(self, request):
        print(request.META.get("HTTP_X_FORWARDED_FOR"))
        print(request.META.get("REMOTE_ADDR"))