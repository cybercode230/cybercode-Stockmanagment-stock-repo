from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('AuthenticationApp.urls')),
    path('products/', include('productMsApp.urls')),
    path('notifications/', include('NotificationApp.urls')),
    path('approval/', include('ApprovalandVerificationApp.urls')),
]
