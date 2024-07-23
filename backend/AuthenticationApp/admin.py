# from django.contrib import admin
# from .models import CustomUser

# @admin.register(CustomUser)
# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('username', 'email', 'user_type', 'is_staff', 'is_active')
#     search_fields = ('username', 'email')
#     list_filter = ('user_type', 'is_staff', 'is_active')
#     fieldsets = (
#         (None, {'fields': ('username', 'password')}),
#         ('Personal info', {'fields': ('email',)}),
#         ('Permissions', {'fields': ('is_staff', 'is_active')}),
#         ('User Type', {'fields': ('user_type',)}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )

from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    list_filter = ('user_type', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('User Type', {'fields': ('user_type',)}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
