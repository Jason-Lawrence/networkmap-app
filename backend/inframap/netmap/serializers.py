from rest_framework import serializers

from . import models


class OpenStackSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.OpenStack
        fields = ['id']
        read_only_fields = ['id']


class CloudPoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CloudPool
        fields = ['id', 'name', 'region']
        read_only_fields = ['id']


class NetworkingSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Networking
        fields = ['id']


class NetworkMapSerializer(serializers.ModelSerializer):

    cloud_pools = CloudPoolSerializer(many=True, required=False)

    class Meta:
        model = models.NetworkMap
        fields = ['id', 'name', 'cloud_pools']
        read_only_fields = ['id']


    def _get_or_create_cloud_pools(self, pools, netmap):
        """Handle getting or creating pools as needed."""
        # user = self.context['request'].user
        for pool in pools:
            pool_obj, created = models.CloudPool.objects.get_or_create(**pool)
            netmap.cloud_pools.add(pool_obj)

    def create(self, validated_data):
        """Creates a Network Map"""
        cloud_pools = validated_data.pop('cloud_pools', [])
        netmap = models.NetworkMap.objects.create(**validated_data)
        self._get_or_create_cloud_pools(cloud_pools, netmap)

        return netmap

    def update(self, instance, validated_data):
        """Update a Network Map"""
        cloud_pools = validated_data.pop('cloud_pools', None)
        if cloud_pools is not None:
            instance.cloud_pools.clear()
            self._get_or_create_cloud_pools(cloud_pools, instance)

        for attr, val in validated_data.items():
            setattr(instance, attr, val)

        instance.save()
        return instance


class NetworkMapDetailSerializer(NetworkMapSerializer):
    """Serializer for NetMap detail view."""
    class Meta(NetworkMapSerializer.Meta):
        fields  = NetworkMapSerializer.Meta.fields + ['description']
