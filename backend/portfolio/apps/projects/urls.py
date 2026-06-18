from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProjectViewSet.as_view({"get": "list"}), name="project-list"),
    path("<slug:slug>/", views.ProjectViewSet.as_view({"get": "retrieve"}), name="project-detail"),
]
