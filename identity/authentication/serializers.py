from django.contrib import auth
from .models import User
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'telephone', 'picture_url', 'password']

    def validate(self, data):
        return data

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'tokens']

    def validate(self, data):
        user = auth.authenticate(email=data.get('email'), password=data.get('password'))

        if not user:
            raise AuthenticationFailed("Invalid login credentials")

        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")

        return {'email': user.email, 'tokens': user.tokens}
