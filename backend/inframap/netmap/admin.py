from django.contrib import admin
from . import models

admin.site.register(models.NetworkMap)
admin.site.register(models.CloudPool)

admin.site.register(models.OpenStackDevice)
admin.site.register(models.KubernetesDevice)
admin.site.register(models.NetworkDevice)

admin.site.register(models.Protocol)