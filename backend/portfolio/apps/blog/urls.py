from django.urls import path
from . import views

urlpatterns = [
    path("", views.PostViewSet.as_view({"get": "list"}), name="post-list"),
    path("tags/", views.PostViewSet.as_view({"get": "tags"}), name="post-tags"),
    path("<slug:slug>/", views.PostViewSet.as_view({"get": "retrieve"}), name="post-detail"),
]
