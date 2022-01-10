from rest_framework import serializers
from .models import PayChannel


class PayChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayChannel
        fields = ['type', 'name', 'currency', 'user', 'amount']
        read_only_fields = ('amount',)
