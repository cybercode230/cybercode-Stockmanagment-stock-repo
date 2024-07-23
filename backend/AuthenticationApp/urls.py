# from django.urls import path
# from .views import UserList, UserDetail, RegisterView, LoginView, CustomTokenObtainPairView

# urlpatterns = [
#     path('users/', UserList.as_view(), name='user-list'),
#     path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
# ]

from django.urls import path
from .views import UserList, UserDetail, RegisterView, LoginView, ChangePasswordView, CustomTokenObtainPairView, PasswordResetView

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
]
