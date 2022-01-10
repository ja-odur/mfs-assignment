from django.urls import path
from .views import PayChannelListCreateView, PayChannelDetailsView

urlpatterns = [
    path('', PayChannelListCreateView.as_view(), name='pay_channels'),
    path('<int:id>', PayChannelDetailsView.as_view(), name='pay_channel_details'),
]
