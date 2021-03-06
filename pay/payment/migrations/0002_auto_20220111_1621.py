# Generated by Django 3.2.11 on 2022-01-11 16:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('channel', '0002_alter_paychannel_amount'),
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='channel',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='receiver',
        ),
        migrations.RemoveField(
            model_name='payment',
            name='sender',
        ),
        migrations.AddField(
            model_name='payment',
            name='receive_channel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='received_by', to='channel.paychannel'),
        ),
        migrations.AddField(
            model_name='payment',
            name='send_channel',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sent_by', to='channel.paychannel'),
        ),
    ]
