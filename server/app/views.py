from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Song, Artist, Album, Playlist, SongStream, Notification, ArtistFollow
from rest_framework.decorators import api_view
from .serializers import PlaylistSerializer, SongSerializer, AlbumSerializer, NotificationSerializer, ArtistFollowSerializer
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.utils.dateparse import parse_date
from django.db import models


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

@api_view(['POST'])
def follow_artist(request, user_id):
    artist_id = request.data.get('artist_id')
    follow, created = ArtistFollow.objects.get_or_create(user_id=user_id, artist_id=artist_id)
    if created:
        return JsonResponse({'message': 'Started following artist'}, status=201)
    return JsonResponse({'message': 'Already following artist'}, status=400)

@api_view(['DELETE'])
def unfollow_artist(request, user_id, artist_id):
    follow = ArtistFollow.objects.filter(user_id=user_id, artist_id=artist_id).first()
    if follow:
        follow.delete()
        return JsonResponse({'message': 'Unfollowed artist'}, status=204)
    return JsonResponse({'message': 'Not following this artist'}, status=404)

@api_view(['GET'])
def get_followed_artists(request, user_id):
    followed_artists = ArtistFollow.objects.filter(user_id=user_id).select_related('artist')
    artists = [follow.artist for follow in followed_artists]
    serializer = ArtistFollowSerializer(artists, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_personalized_recommendations(request, user_id):
    # Assuming you have a function or method to get recommendations based on user listening habits
    recommendations = generate_recommendations_based_on_listening_history(user_id)  # replace with actual logic
    return JsonResponse(recommendations, safe=False)

@api_view(['POST'])
def create_playlist(request):
    serializer = PlaylistSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def get_playlists(request, user_id):
    playlists = Playlist.objects.filter(user_id=user_id)
    serializer = PlaylistSerializer(playlists, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['PUT'])
def update_playlist(request, playlist_id):
    playlist = Playlist.objects.get(id=playlist_id)
    serializer = PlaylistSerializer(playlist, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_playlist(request, playlist_id):
    playlist = Playlist.objects.get(id=playlist_id)
    playlist.delete()
    return JsonResponse({'message': 'Playlist deleted successfully'}, status=204)

@api_view(['POST'])
def add_song_to_playlist(request, playlist_id):
    playlist = Playlist.objects.get(id=playlist_id)
    song_id = request.data.get('song_id')
    song = Song.objects.get(id=song_id)
    playlist.songs.add(song)
    return JsonResponse({'message': 'Song added to playlist'}, status=200)

@api_view(['DELETE'])
def remove_song_from_playlist(request, playlist_id, song_id):
    playlist = Playlist.objects.get(id=playlist_id)
    song = Song.objects.get(id=song_id)
    playlist.songs.remove(song)
    return JsonResponse({'message': 'Song removed from playlist'}, status=200)

@api_view(['GET'])
def get_user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    playlists = Playlist.objects.filter(user_id=user.id)
    saved_songs = list(user.songs.values())
    return JsonResponse({
        'user': {'id': user.id, 'username': user.username},
        'playlists': PlaylistSerializer(playlists, many=True).data,
        'saved_songs': saved_songs
    })

@api_view(['PUT'])
def update_user_profile(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
def add_song(request):
    serializer = SongSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['PUT'])
def update_song(request, song_id):
    song = Song.objects.get(id=song_id)
    serializer = SongSerializer(song, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_song(request, song_id):
    song = Song.objects.get(id=song_id)
    song.delete()
    return JsonResponse({'message': 'Song deleted successfully'}, status=204)

@api_view(['POST'])
def add_album(request):
    serializer = AlbumSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['PUT'])
def update_album(request, album_id):
    album = Album.objects.get(id=album_id)
    serializer = AlbumSerializer(album, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

@api_view(['DELETE'])
def delete_album(request, album_id):
    album = Album.objects.get(id=album_id)
    album.delete()
    return JsonResponse({'message': 'Album deleted successfully'}, status=204)

@api_view(['GET'])
def stream_song(request, song_id):
    song = Song.objects.get(id=song_id)
    return JsonResponse({'url': f'/media/songs/{song.id}.mp3', 'name': song.name, 'duration': str(song.duration)})

@api_view(['GET'])
def get_song_details(request, song_id):
    song = Song.objects.get(id=song_id)
    serializer = SongSerializer(song)
    return JsonResponse(serializer.data)

@api_view(['GET'])
def generate_stream_reports(request):
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    streams = SongStream.objects.filter(stream_date__range=[parse_date(start_date), parse_date(end_date)])
    report_data = list(streams.values('song__name', 'stream_url', 'stream_date'))
    return JsonResponse(report_data, safe=False)

@api_view(['GET'])
def generate_user_engagement_reports(request):
    engagements = Playlist.objects.annotate(num_songs=models.Count('songs')).values('user_id', 'num_songs')
    return JsonResponse(list(engagements), safe=False)

@api_view(['GET'])
def fetch_notifications(request, user_id):
    notifications = Notification.objects.filter(user_id=user_id)
    serializer = NotificationSerializer(notifications, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def mark_notification_as_read(request, user_id, notification_id):
    notification = Notification.objects.get(id=notification_id, user_id=user_id)
    notification.read = True
    notification.save()
    return JsonResponse({'message': 'Notification marked as read'}, status=200)