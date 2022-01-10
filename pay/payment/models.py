from django.db import models


class Payment(models.Model):
    amount = models.DecimalField(max_digits=19, decimal_places=2)
    sender = models.ForeignKey('authentication.MinimalUser', on_delete=models.CASCADE, related_name='sent_by')
    receiver = models.ForeignKey('authentication.MinimalUser', on_delete=models.CASCADE, related_name='received_by')
    channel = models.ForeignKey('channel.PayChannel', on_delete=models.CASCADE)
    reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
