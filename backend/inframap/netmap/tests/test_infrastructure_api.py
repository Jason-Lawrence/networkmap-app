from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from .. import models, serializers


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def create_netmap(user, **params):
    """"""
    defaults = {
        'name': 'test map',
        'description': 'Test Map',
    }
    defaults.update(params)

    netmap = models.NetworkMap.objects.create(user=user, **defaults)
    return netmap


class InfrastructureAPITests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = create_user(username="test_user", password="testpass123")
        self.client.force_authenticate(self.user)

    