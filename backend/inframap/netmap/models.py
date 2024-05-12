from django.db import models
from django.contrib.auth.models import User


class Protocol(models.Model):

    port = models.IntegerField()
    protocol = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.protocol}  {self.port}"


class Device(models.Model):

    device_type = models.CharField(max_length=100)
    hostname = models.CharField(max_length=100)
    in_band_ip = models.GenericIPAddressField()
    out_of_band_ip = models.GenericIPAddressField()
    extra = models.JSONField(blank=True, null=True)
    protocols = models.ManyToManyField(Protocol)

    def __str__(self):
        return self.hostname


class Infrastructure(models.Model):

    class Meta:
        abstract = True

    def to_cytoscape(self):
        pass

class OpenStack(Infrastructure):

    def to_cytoscape(self):
        pass

    def __str__(self):
        return f"I dont know"


class OpenStackDevice(Device):

    service = models.CharField(max_length=20)
    infrastructure = models.ForeignKey(OpenStack, on_delete=models.CASCADE)


class Kubernetes(Infrastructure):

    def to_cytoscape(self):
        pass


class KubernetesDevice(Device):

    infrastructure = models.ForeignKey(Kubernetes, on_delete=models.CASCADE)


class Networking(Infrastructure):

    def to_cytoscape(self):
        pass


class NetworkDevice(Device):

    public_ip = models.GenericIPAddressField()
    infrastructure = models.ForeignKey(Networking, on_delete=models.CASCADE)

class CloudPool(models.Model):

    name = models.CharField(max_length=255)
    region = models.CharField(max_length=50)
    openstack = models.OneToOneField(OpenStack, on_delete=models.CASCADE, null=True)
    network = models.OneToOneField(Networking, on_delete=models.CASCADE, null=True)
    kubernetes = models.OneToOneField(Kubernetes, on_delete=models.CASCADE, null=True)


class NetworkMap(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    cloud_pools = models.ManyToManyField(CloudPool)

