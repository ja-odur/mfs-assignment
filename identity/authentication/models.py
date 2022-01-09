import re
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models, transaction
from django.utils.translation import ugettext_lazy as _

mailbox_pat = r"[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"  # dot-atom

# max length of the domain is 249: 254 (max email length) minus one
# period, two characters for the TLD, @ sign, & one character before @.
domain_pat = r'(?:[A-Z0-9](?:[A-Z0-9-]{0,247}[A-Z0-9])?\.)+(?:[A-Z]{2,63})'
email_pat = r'@'.join((mailbox_pat, domain_pat))

# Compile the complete email regular expression
email_re = re.compile(r'^' + email_pat + r'$', re.IGNORECASE)


def validate_email(email):
    """
    Performs a few checks on the given email address to filter out any email
    addresses we don't want to record in our address books (most likely email
    addresses that are invalid, or belong to robots).
    """
    return bool(email_re.match(email))


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        if not validate_email(email):
            raise ValueError('Not a valid email address: {}'.format(email))
        email = self.normalize_email(email)

        with transaction.atomic(using=self._db):
            user = self.model(email=email, **extra_fields)
            if password is not None:
                user.set_password(password)
            else:
                user.set_unusable_password()
            user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)

        # first_name = extra_fields.pop('first_name', u'').strip()
        # last_name = extra_fields.pop('last_name', u'').strip()
        # name = u'{} {}'.format(first_name, last_name).strip()
        #
        # extra_fields.setdefault('name', name)
        extra_fields.setdefault('preferred_name', extra_fields.get('first_name'))

        user = self._create_user(email, password=password, **extra_fields)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    # NOTE: the following fields are inherited from AbstractBaseUser:
    # - password
    # - last_login

    first_name = models.TextField()
    last_name = models.TextField()
    preferred_name = models.TextField(default='')
    email = models.TextField(unique=True)

    telephone = models.TextField(blank=True, null=True)
    picture_url = models.TextField(blank=True, null=True)

    is_staff = models.BooleanField(default=False, help_text=_('Designates whether the user can log into this admin site.'),)
    is_active = models.BooleanField(
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def tokens(self):
        return

    def __str__(self):
        short = self.name.strip()
        if short:
            return short
        else:
            return self.email

    def __repr__(self):
        return '<User id={} email={!r}>'.format(self.id, self.email)
