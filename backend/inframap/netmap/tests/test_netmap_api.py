from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from .. import models, serializers


NETWORK_URL = reverse('netmap:networkmap-list')

def detail_url(network_map_id):
    return reverse('netmap:networkmap-detail', args=[network_map_id])


def create_user(**params):
    return get_user_model().objects.create_user(**params)


def create_netmap(user, **params):
    """"""
    defaults = {
        'name': 'test map',
        'description': 'Test Map',
        'is_public': True,
        'is_editable': False
    }
    defaults.update(params)

    netmap = models.NetworkMap.objects.create(user=user, **defaults)
    return netmap


class NetworkMapAPITests(TestCase):

    def setUp(self) -> None:
        self.client = APIClient()
        self.user = create_user(
            name="test_user",
            email="testuser@test.com",
            password="testpass123"
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_netmap(self):
        create_netmap(user=self.user)
        create_netmap(user=self.user)

        res = self.client.get(NETWORK_URL)

        netmaps = models.NetworkMap.objects.all().order_by('-id')
        serializer = serializers.NetworkMapSerializer(netmaps, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_get_netmap_detail(self):
        """"""
        netmap = create_netmap(user=self.user)
        url = detail_url(netmap.id)
        res = self.client.get(url)

        serializer = serializers.NetworkMapDetailSerializer(netmap)
        self.assertEqual(res.data, serializer.data)

    def test_create_netmap(self):
        payload = {
            'name': 'Test_1',
            'description': 'test-1',
            'is_public': True,
            'is_editable': False
        }
        res = self.client.post(NETWORK_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        netmap = models.NetworkMap.objects.get(id=res.data['id'])
        for k, v in payload.items():
            self.assertEqual(getattr(netmap, k), v)

        self.assertEqual(netmap.user, self.user)

    def test_partial_update(self):
        """"""
        netmap = create_netmap(
            user=self.user,
            name="Test Map",
            description="Test Map Description"
        )

        payload = {
            'name': 'New Map'
        }

        url = detail_url(netmap.id)

        res = self.client.patch(url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        netmap.refresh_from_db()
        self.assertEqual(netmap.name, payload['name'])
        self.assertEqual(netmap.user, self.user)
        self.assertEqual(netmap.description, "Test Map Description")

    def test_create_netmap_with_new_cloudpools(self):
        payload = {
            'name': 'test map',
            'description': "Test Map",
            'cloudpools':[
                {
                    'name': 'test_pool', 
                    'region': 'test-1',
                    'description': 'test description'
                },
                {
                    'name': 'fake_pool', 
                    'region': 'fake-1',
                    'description': 'fake description'
                }
            ]
        }
        res = self.client.post(NETWORK_URL, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        netmaps = models.NetworkMap.objects.all()
        self.assertEqual(netmaps.count(), 1)
        netmap = netmaps[0]
        self.assertEqual(netmap.cloudpools.count(), 2)
        for pool in payload['cloudpools']:
            exists = netmap.cloudpools.filter(
                name=pool['name'],
                region=pool['region']
            ).exists()
            self.assertTrue(exists)