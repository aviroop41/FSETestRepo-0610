from django.db import models

# Create your models here.

def search_music(query):
    songs = Song.objects.filter(title__icontains=query)
    artists = Artist.objects.filter(name__icontains=query)
    albums = Album.objects.filter(title__icontains=query)
    return {
        'songs': list(songs.values()),
        'artists': list(artists.values()),
        'albums': list(albums.values())
    }