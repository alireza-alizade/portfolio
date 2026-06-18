from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.filter(published=True)
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return PostListSerializer
        return PostDetailSerializer

    @action(detail=False, methods=["get"])
    def tags(self, request):
        tags = set()
        for post in self.get_queryset():
            tags.update(post.tags)
        return Response(sorted(tags))
