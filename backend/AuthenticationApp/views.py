from django.contrib.auth import authenticate
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser
from .serializers import CustomUserSerializer, RegisterSerializer, LoginSerializer, CustomTokenObtainPairSerializer,ChangePasswordSerializer,PasswordResetSerializer
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import default_token_generator

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(user_data, status=status.HTTP_201_CREATED, headers=headers)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        refresh = RefreshToken.for_user(user)
        return Response({
            'user': CustomUserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({"detail": "Password updated successfully"}, status=status.HTTP_200_OK)



class PasswordResetView(generics.CreateAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = default_token_generator.make_token(user)
        self.send_reset_email(user, token)
        return Response({"detail": "Password reset email sent"}, status=status.HTTP_200_OK)

    def send_reset_email(self, user, token):
        reset_link = f"http://example.com/reset-password/?token={token}"
        subject = "Password Reset Request"
        message = f"Click the following link to reset your password: {reset_link}"
        email = EmailMessage(subject, message, to=[user.email])
        email.send()