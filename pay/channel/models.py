from django.db import models, transaction


class PayChannel(models.Model):
    TYPE_CHOICES = [
        ('MM', 'MM'),
        ('BANK', 'BANK'),
    ]
    CURRENCY_CHOICES = [
        ('UGX', 'UGX'),
        ('USD', 'USD'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    name = models.CharField(max_length=15, unique=True)
    amount = models.DecimalField(max_digits=19, decimal_places=2)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    user = models.ForeignKey('authentication.MinimalUser', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
