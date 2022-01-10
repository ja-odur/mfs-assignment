from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Payment
from .serializers import PaymentSerializer


class PaymentListCreateView(ListCreateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        return serializer.save(sender=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user)


class PaymentDetailsView(RetrieveAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = (permissions.IsAuthenticated)
    lookup_field = 'id'

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user)
