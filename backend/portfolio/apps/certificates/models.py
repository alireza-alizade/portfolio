from django.db import models


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    date_obtained = models.DateField()
    url = models.URLField(blank=True, help_text="Link to verify certificate")
    icon = models.CharField(max_length=50, blank=True, help_text="Simple icon name or emoji")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title
