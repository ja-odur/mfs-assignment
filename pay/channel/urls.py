from django.urls import path
from .views import PayChannelListCreateView, PayChannelDetailsView, AllPaymentsDetailView

urlpatterns = [
    path('', PayChannelListCreateView.as_view(), name='pay_channels'),
    path('<int:id>', PayChannelDetailsView.as_view(), name='pay_channel_details'),
    path('all/', AllPaymentsDetailView.as_view(), name='all_channels'),
]
