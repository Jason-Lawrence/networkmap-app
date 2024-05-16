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
                'cloudpools',
                OpenApiTypes.STR,
                description='Comma separated list of cloudpool_ids to filter'
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
        cloudpools = self.request.query_params.get('cloudpools')
        queryset = self.queryset
        if cloudpools:
            cloudpool_ids = self._params_to_ints(cloudpools)
            queryset = queryset.filter(cloudpools__id__in=cloudpool_ids)

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


class CloudPoolViewSet(viewsets.ModelViewSet):
    """"""
    serializer_class = serializers.CloudPoolSerializer
    queryset = models.CloudPool.objects.all()
    
    def get_queryset(self):
        """"""
        return self.queryset
    
    def perform_create(self, serializer):
        """"""
        serializer.save()
        