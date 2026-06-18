from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/projects/", include("portfolio.apps.projects.urls")),
    path("api/skills/", include("portfolio.apps.skills.urls")),
    path("api/blog/", include("portfolio.apps.blog.urls")),
    path("api/contact/", include("portfolio.apps.contact.urls")),
    path("api/certificates/", include("portfolio.apps.certificates.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
