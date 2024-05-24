from django.db import models
from django.contrib.auth.models import User

class Protocol(models.Model):
    """
    Model used for holding modes of communication a device can use.
    
    :param port: The port the protocol uses.
    :type port: int.
    :param protocol: The name of the protocol.
    :type protocol: str.
    """
    port = models.IntegerField()
    protocol = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.protocol} {self.port}"


class Device(models.Model):
    """
    Model for base devices, Used to make Subclasses. 

    :param device_type: The name of the Device._
    :type device_type: str. 
    :param hostname: THe hostname for the device.
    :type hostname: str.
    :param in_band_ip: The in band IP Address.
    :type in_band_ip: IPv4 str.
    :param out_of_band_ip: The out of band IP address.
    :type out_of_band_ip: IPv4 str.
    :param manufacturer: The manufacturer of the device.
    :type manufacturer: str.
    :param model: The Model number for the device.
    :type model: str.
    :param protocols: The protocols the device uses to communicate with.
    :type protocols: :class: Protocol
    :param extra: Extra data about the device.
    :type extra: JSON
    """    
    
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
    """
    Model to use for OpenStack Devices.
    
    :param service: The parent service of the device.
    :type service: str.
    :param availability_zone: The availability zone the device is deployed in.
    :type availability_zone: str.
    :param cloud_pool: The cloud pool the device belongs too.
    :type cloud_pool: :class: CloudPool
    """
    service = models.CharField(max_length=20, null=True, blank=True)
    availability_zone = models.CharField(max_length=30, null=True, blank=True)
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='openstack_devices')


class KubernetesDevice(Device):
    """
    Model to use for Kubernetes Devices.
    
    :param cloud_pool: The cloud pool the device belongs too.
    :type cloud_pool: :class: CloudPool
    """
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='kubernetes_devices')


class NetworkDevice(Device):
    """
    Model to use for Network Devices.
    
    :param public_ip: The public IP address for the device.
    :type public_ip: IPv4 str.
    :param cloud_pool: The cloud pool the device belongs too.
    :type cloud_pool: :class: CloudPool
    """
    public_ip = models.GenericIPAddressField()
    cloud_pool = models.ForeignKey('CloudPool', on_delete=models.CASCADE, related_name='network_devices')
    
    
class CloudPool(models.Model):
    """
    Model to use for CloudPool.
    
    :param name: The name of the Cloud Pool.
    :type name: str.
    :param region: The region Identifier for the Cloud Pool.
    :type region: str.
    """
    name = models.CharField(max_length=255)
    region = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
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
