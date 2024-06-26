# Generated by Django 5.0.6 on 2024-06-02 15:59

import django.db.models.deletion
import netfields.fields
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('netmap', '0003_remove_cloudpool_is_base_model_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='cloudpool',
        ),
        migrations.RemoveField(
            model_name='kubernetesdevice',
            name='device_ptr',
        ),
        migrations.RemoveField(
            model_name='networkdevice',
            name='device_ptr',
        ),
        migrations.RemoveField(
            model_name='openstackdevice',
            name='device_ptr',
        ),
        migrations.AddField(
            model_name='device',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='authdevice',
            name='entry_point',
            field=netfields.fields.InetAddressField(max_length=39),
        ),
        migrations.AlterField(
            model_name='authdevice',
            name='private_pool',
            field=netfields.fields.InetAddressField(max_length=39),
        ),
        migrations.AlterField(
            model_name='device',
            name='in_band_ip',
            field=netfields.fields.InetAddressField(max_length=39),
        ),
        migrations.AlterField(
            model_name='device',
            name='out_of_band_ip',
            field=netfields.fields.InetAddressField(max_length=39),
        ),
        migrations.AlterField(
            model_name='networkdevice',
            name='public_ip',
            field=netfields.fields.InetAddressField(max_length=39),
        ),
        migrations.AlterField(
            model_name='protocol',
            name='port',
            field=models.IntegerField(null=True),
        ),
        migrations.CreateModel(
            name='InfraDevice',
            fields=[
                ('device_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.device')),
                ('public_ip', netfields.fields.InetAddressField(max_length=39)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            bases=('netmap.device',),
        ),
        migrations.AddField(
            model_name='networkmap',
            name='infrastructure',
            field=models.ManyToManyField(to='netmap.infradevice'),
        ),
        migrations.CreateModel(
            name='CloudDevice',
            fields=[
                ('device_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.device')),
                ('cloudpool', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='netmap.cloudpool')),
            ],
            bases=('netmap.device',),
        ),
        migrations.AddField(
            model_name='kubernetesdevice',
            name='clouddevice_ptr',
            field=models.OneToOneField(auto_created=True, default=None, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.clouddevice'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='networkdevice',
            name='clouddevice_ptr',
            field=models.OneToOneField(auto_created=True, default=None, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.clouddevice'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='openstackdevice',
            name='clouddevice_ptr',
            field=models.OneToOneField(auto_created=True, default=None, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='netmap.clouddevice'),
            preserve_default=False,
        ),
    ]
