# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase
# from django.contrib.auth.models import User
# from rest_framework_simplejwt.tokens import RefreshToken

# class AuthenticationTests(APITestCase):
    
#     def setUp(self):
#         self.register_url = reverse('register')
#         self.login_url = reverse('login')
#         self.logout_url = reverse('logout')
#         self.user_data = {
#             'username': 'testuser',
#             'email': 'testuser@example.com',
#             'password': 'testpassword123'
#         }
#         self.user = User.objects.create_user(**self.user_data)

#     def test_register_user(self):
#         data = {
#             'username': 'newuser',
#             'email': 'newuser@example.com',
#             'password': 'newpassword123'
#         }
#         response = self.client.post(self.register_url, data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(User.objects.count(), 2)
#         self.assertEqual(User.objects.get(username='newuser').email, 'newuser@example.com')

#     def test_login_user(self):
#         data = {
#             'username': self.user_data['username'],
#             'password': self.user_data['password']
#         }
#         response = self.client.post(self.login_url, data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('access', response.data)
#         self.assertIn('refresh', response.data)

#     def test_login_user_invalid_credentials(self):
#         data = {
#             'username': self.user_data['username'],
#             'password': 'wrongpassword'
#         }
#         response = self.client.post(self.login_url, data)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#         self.assertNotIn('access', response.data)
#         self.assertNotIn('refresh', response.data)

#     def test_logout_user(self):
#         refresh = RefreshToken.for_user(self.user)
#         self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
#         data = {
#             'refresh': str(refresh)
#         }
#         response = self.client.post(self.logout_url, data)
#         self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

#     def test_logout_user_invalid_token(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + 'invalidtoken')
#         data = {
#             'refresh': 'invalidtoken'
#         }
#         response = self.client.post(self.logout_url, data)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
