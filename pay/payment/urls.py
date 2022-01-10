from django.urls import path
from .views import PaymentListCreateView, PaymentDetailsView

urlpatterns = [
    path('', PaymentListCreateView.as_view(), name='payment'),
    path('<int:id>', PaymentDetailsView.as_view(), name='payment_detail'),
]