from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import PayChannel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email']


class PayChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayChannel
        fields = ['id', 'type', 'name', 'currency', 'user', 'amount']
        read_only_fields = ('id', 'amount',)


class ListAllPayChannelSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = PayChannel
        fields = ['id', 'type', 'name', 'currency', 'user']
