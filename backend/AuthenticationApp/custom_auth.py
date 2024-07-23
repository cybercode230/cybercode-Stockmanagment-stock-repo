from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser

def custom_login(username, password):
    user = authenticate(username=username, password=password)
    if user and user.is_active:
        refresh = RefreshToken.for_user(user)
        return {
            'user': user,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
    else:
        raise ValueError("Invalid Credentials")
