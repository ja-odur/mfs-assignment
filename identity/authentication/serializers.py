from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'telephone', 'picture_url', 'password']

    def validate(self, data):
        return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)