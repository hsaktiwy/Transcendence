from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import MyUser

class UserAdmin(BaseUserAdmin):
    list_display = ('login', 'email', 'firstName', 'lastName', 'is_admin', 'is_superuser', 'profile_pic')
    search_fields = ('login', 'email', 'firstName', 'lastName')
    readonly_fields = ('created_at',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('login', 'email', 'password')}),
        ('Personal info', {'fields': ('firstName', 'lastName', 'birthDay', 'profile_pic')}),
        ('Permissions', {'fields': ('is_admin', 'is_superuser', 'is_active', 'is_staff')}),
        ('Important dates', {'fields': ('created_at',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('login', 'email', 'firstName', 'lastName', 'birthDay', 'password1', 'password2', 'profile_pic'),
        }),
    )
    ordering = ('login',)

admin.site.register(MyUser, UserAdmin)
