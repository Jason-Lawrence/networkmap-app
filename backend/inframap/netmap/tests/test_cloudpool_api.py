from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from .. import models, serializers


CLOUDPOOL_URL = reverse('netmap:cloudpool-list')

def create_user(username="test-user", password="testpass123"):
    return get_user_model().objects.create_user(username=username, password=password)

def detail_url(cloudpool_id):
    return reverse('netmap:cloudpool-detail', args=[cloudpool_id])


class CloudPoolAPITests(TestCase):

    def setUp(self) -> None:
        self.user = create_user()
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_cloudpools(self):
        """Test Retrieve Cloud Pools"""
        models.CloudPool.objects.create(name="test_pool", region="test-1")
        models.CloudPool.objects.create(name="fake_pool", region="fake-1")

        res = self.client.get(CLOUDPOOL_URL)
        pools = models.CloudPool.objects.all().order_by('-name')
        serializer = serializers.CloudPoolSerializer(pools, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_delete_cloudpool(self):
        """Test Delete a cloud Pool"""
        pool = models.CloudPool.objects.create(name="test_pool", region="test-1")
        url = detail_url(pool.id)
        res = self.client.delete(url)
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        pools = models.CloudPool.objects.all()
        self.assertFalse(pools.exists())

    
