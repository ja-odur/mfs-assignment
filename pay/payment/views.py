from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.exceptions import ValidationError
from .models import Payment
from .serializers import PaymentSerializer


class PaymentListCreateView(ListCreateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):

        data = serializer.validated_data
        amount = data.get('amount')
        sender = data.get('send_channel')
        receiver = data.get('receive_channel')
        if sender.currency != receiver.currency:
            raise ValidationError('Different account currencies')

        if sender.id == receiver.id:
            raise ValidationError('Transferring to the same account')

        if sender.amount < amount:
            raise ValidationError('Insufficient amount')

        sender.amount = sender.amount - int(amount)
        receiver.amount = receiver.amount + int(amount)
        sender.save()
        receiver.save()
        return serializer.save()

    def get_queryset(self):
        return self.queryset.filter(
            Q(send_channel__user__email=self.request.user) | Q(receive_channel__user__email=self.request.user)
        )


class PaymentDetailsView(RetrieveAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'id'

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(sender=self.request.user)
