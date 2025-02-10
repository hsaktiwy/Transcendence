from django.contrib import admin
from .models import ProfileStatus, Notification, Achievements
# Register your models here.

admin.site.register(ProfileStatus)
admin.site.register(Notification)
admin.site.register(Achievements)
