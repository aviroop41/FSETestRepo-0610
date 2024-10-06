from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Song, Artist, Album


def search(request):
    query = request.GET.get('query', '')
    songs = Song.objects.filter(name__icontains=query)
    artists = Artist.objects.filter(name__icontains=query)
    albums = Album.objects.filter(name__icontains=query)
    return JsonResponse({
        'songs': list(songs.values()),
        'artists': list(artists.values()),
        'albums': list(albums.values())
    })