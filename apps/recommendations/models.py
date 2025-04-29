from django.db import models

class Recommendation(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    activite = models.CharField(max_length=100)
    budget = models.CharField(max_length=50)
    climat = models.CharField(max_length=50)
    transport = models.CharField(max_length=50)
    image_url = models.URLField(max_length=1024, null=True, blank=True)  # URL de l'image
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
