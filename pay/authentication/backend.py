from django.contrib.auth import get_user_model
from rest_framework_simplejwt.authentication import (
    JWTAuthentication,
    api_settings,
    InvalidToken,
    AuthenticationFailed,
    _
)


class JWTGetOrCreateUserAuthentication(JWTAuthentication):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_model = get_user_model()

    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError:
            raise InvalidToken(_("Token contained no recognizable user identification"))

        try:
            user = self.user_model.objects.get(**{api_settings.USER_ID_FIELD: user_id})
        except self.user_model.DoesNotExist:
            user = self.user_model.objects.create_user(**{api_settings.USER_ID_FIELD: user_id})

        if not user.is_active:
            raise AuthenticationFailed(_("User is inactive"), code="user_inactive")

        return user
