"""
Views for the Network Map API.
"""

from rest_framework import (
    viewsets,
    mixins,
)

from drf_spectacular.utils import (
    extend_schema_view,
    extend_schema,
    OpenApiParameter,
    OpenApiTypes,
)

from . import models, serializers

@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'cloud_pools',
                OpenApiTypes.STR,
                description='Comma separated list of cloud_pool_ids to filter'
            ),
        ]
    )
)
class NetworkMapViewSet(viewsets.ModelViewSet):
    """View for managing Network Maps APIs"""
    serializer_class = serializers.NetworkMapDetailSerializer
    queryset = models.NetworkMap.objects.all()

    def _params_to_ints(self, qs):
        """Convert list of strings to integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """"""
        cloud_pools = self.request.query_params.get('cloud_pools')
        queryset = self.queryset
        if cloud_pools:
            cloud_pool_ids = self._params_to_ints(cloud_pools)
            queryset = queryset.filter(cloud_pools__id__in=cloud_pool_ids)

        return queryset.order_by('-id').distinct()

    def get_serializer_class(self):
        """Return the serializer for the request."""
        if self.action == 'list':
            return serializers.NetworkMapSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new Network Map"""
        serializer.save(user=self.request.user)


@extend_schema_view(
    list=extend_schema(
        parameters=[
            OpenApiParameter(
                'assigned_only',
                OpenApiTypes.INT, enum=[0, 1],
                description='Filter by items assigned to NetMaps'
            )
        ]
    )
)
class BaseNetworkMapAttrViewSet(mixins.UpdateModelMixin,
                                mixins.DestroyModelMixin,
                                mixins.ListModelMixin,
                                viewsets.GenericViewSet):

    def get_queryset(self):
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(networkmap__isnull=False)

        return queryset.order_by('-name').distinct()


class CloudPoolViewSet(BaseNetworkMapAttrViewSet):
    """"""
    serializer_class = serializers.CloudPoolSerializer
    queryset = models.CloudPool.objects.all()


class OpenStackViewSet(viewsets.ModelViewSet):

    serializer_class = serializers.OpenStackSerializer
    queryset = models.OpenStack.objects.none()

    def get_queryset(self):
        cloudpool_id = self.request.query_params.get('cloudpool_id')
        if cloudpool_id:
            self.queryset = models.OpenStack.objects.filter(cloud_pool_id=cloudpool_id)

        return self.queryset