from django.db import models

# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=255)

class Artist(models.Model):
    name = models.CharField(max_length=255)

class Album(models.Model):
    title = models.CharField(max_length=255)