from django.urls import path
from . import views

urlpatterns = [
    path("", views.SkillCategoryViewSet.as_view({"get": "list"}), name="skill-list"),
]
