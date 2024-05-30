# Generated by Django 5.0.6 on 2024-05-27 14:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('netmap', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='cloudpool',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='networkmap',
            name='cloudpools',
            field=models.ManyToManyField(to='netmap.cloudpool'),
        ),
        migrations.AddField(
            model_name='networkmap',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='device',
            name='protocols',
            field=models.ManyToManyField(to='netmap.protocol'),
        ),
        migrations.CreateModel(
            name='KubernetesDevice',
            fields=[
                ('device_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.device')),
                ('cloud_pool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='kubernetes_devices', to='netmap.cloudpool')),
            ],
            bases=('netmap.device',),
        ),
        migrations.CreateModel(
            name='NetworkDevice',
            fields=[
                ('device_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.device')),
                ('public_ip', models.GenericIPAddressField()),
                ('cloud_pool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='network_devices', to='netmap.cloudpool')),
            ],
            bases=('netmap.device',),
        ),
        migrations.CreateModel(
            name='OpenStackDevice',
            fields=[
                ('device_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.device')),
                ('service', models.CharField(blank=True, max_length=20, null=True)),
                ('availability_zone', models.CharField(blank=True, max_length=30, null=True)),
                ('cloud_pool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='openstack_devices', to='netmap.cloudpool')),
            ],
            bases=('netmap.device',),
        ),
    ]
