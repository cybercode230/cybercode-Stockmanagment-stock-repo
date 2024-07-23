from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('stock_manager', 'Stock Manager'),
        ('business_owner', 'Business Owner'),
    )

    user_type = models.CharField(max_length=50, choices=USER_TYPE_CHOICES)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set', 
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
