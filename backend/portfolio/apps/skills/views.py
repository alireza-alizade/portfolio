from rest_framework import viewsets
from .models import SkillCategory
from .serializers import SkillCategorySerializer


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
