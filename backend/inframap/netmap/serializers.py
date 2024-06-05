from rest_framework import serializers

from . import models


class CloudPoolSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CloudPool
        fields = ['id', 'name', 'region', 'description']
        read_only_fields = ['id']
        
    def create(self, validated_data):
        """"""
        return models.CloudPool.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """"""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
        

class NetworkMapSerializer(serializers.ModelSerializer):


    class Meta:
        model = models.NetworkMap
        fields = ['id', 'name', 'description']
        read_only_fields = ['id']


    def _get_or_create_cloud_pools(self, pools, netmap):
        """Handle getting or creating pools as needed."""
        user = self.context['request'].user
        for pool in pools:
            pool_obj, created = models.CloudPool.objects.get_or_create(
                user=user,
                **pool
            )
            netmap.cloudpools.add(pool_obj)

    def create(self, validated_data):
        """Creates a Network Map"""
        cloud_pools = validated_data.pop('cloudpools', [])
        netmap = models.NetworkMap.objects.create(**validated_data)
        self._get_or_create_cloud_pools(cloud_pools, netmap)

        return netmap

    def update(self, instance, validated_data):
        """Update a Network Map"""
        cloud_pools = validated_data.pop('cloudpools', None)
        if cloud_pools is not None:
            instance.cloudpools.clear()
            self._get_or_create_cloud_pools(cloud_pools, instance)

        for attr, val in validated_data.items():
            setattr(instance, attr, val)

        instance.save()
        return instance


class NetworkMapDetailSerializer(NetworkMapSerializer):
    """Serializer for NetMap detail view."""
    
    cloudpools = CloudPoolSerializer(many=True, required=False)
    
    class Meta(NetworkMapSerializer.Meta):
        fields = NetworkMapSerializer.Meta.fields + ['cloudpools', 'is_public', 'is_editable']
        

class CloudPoolDetailSerializer(CloudPoolSerializer):
    
    class Meta(CloudPoolSerializer.Meta):
        fields = CloudPoolSerializer.Meta.fields