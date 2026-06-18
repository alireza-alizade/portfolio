from django.urls import path
from . import views

urlpatterns = [
    path("", views.CertificateViewSet.as_view({"get": "list"}), name="certificate-list"),
]
