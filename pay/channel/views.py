from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from .models import PayChannel
from .serializers import PayChannelSerializer
from .permissions import IsOwner


class PayChannelListCreateView(ListCreateAPIView):
    serializer_class = PayChannelSerializer
    queryset = PayChannel.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class PayChannelDetailsView(RetrieveUpdateDestroyAPIView):
    serializer_class = PayChannelSerializer
    queryset = PayChannel.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    lookup_field = 'id'

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
