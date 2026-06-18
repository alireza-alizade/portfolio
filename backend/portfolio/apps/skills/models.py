from django.db import models


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "skill categories"
        ordering = ["order"]

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        SkillCategory, on_delete=models.CASCADE, related_name="skills"
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Simple icon name or emoji")
    proficiency = models.PositiveIntegerField(default=0, help_text="0-100")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name
