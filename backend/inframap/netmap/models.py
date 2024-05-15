from django.db import models
from django.contrib.auth.models import User

class Protocol(models.Model):
    port = models.IntegerField()
    protocol = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.protocol} {self.port}"

class Device(models.Model):
    device_type = models.CharField(max_length=100)
    hostname = models.CharField(max_length=100)
    in_band_ip = models.GenericIPAddressField()
    out_of_band_ip = models.GenericIPAddressField()
    manufacturer = models.CharField(max_length=50)
    model = models.CharField(max_length=25)
    extra = models.JSONField(blank=True, null=True)
    protocols = models.ManyToManyField(Protocol)

    def __str__(self):
        return self.hostname

class OpenStackDevice(Device):
    service = models.CharField(max_length=20)
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='openstack_devices')

class KubernetesDevice(Device):
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='kubernetes_devices')

class NetworkDevice(Device):
    public_ip = models.GenericIPAddressField()
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='network_devices')

class CloudPool(models.Model):
    name = models.CharField(max_length=255)
    region = models.CharField(max_length=50)
    # Devices will be linked through the device models' foreign keys

    def __str__(self):
        return self.name

class NetworkMap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    cloudpools = models.ManyToManyField(CloudPool)

    def __str__(self):
        return self.name
