from django.db import models

# Create your models here.
class Song(models.Model):
    name = models.CharField(max_length=255)
    album = models.ForeignKey('Album', on_delete=models.CASCADE)
    duration = models.DurationField()

class Artist(models.Model):
    name = models.CharField(max_length=255)

class Album(models.Model):
    title = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    release_date = models.DateField()

class Playlist(models.Model):
    name = models.CharField(max_length=255)
    user_id = models.IntegerField()
    songs = models.ManyToManyField(Song, blank=True)

class SongStream(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    stream_url = models.URLField(max_length=255)
    quality = models.CharField(max_length=50)
    bitrate = models.IntegerField()

class SongDetail(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    detailed_description = models.TextField(blank=True)
    tags = models.CharField(max_length=255, blank=True)