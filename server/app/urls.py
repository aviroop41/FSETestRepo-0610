from django.urls import path
from .views import search, create_playlist, get_playlists, update_playlist, delete_playlist, add_song_to_playlist, remove_song_from_playlist

urlpatterns = [
    path('search', search, name='search'),
    path('playlists/create', create_playlist, name='create_playlist'),
    path('playlists/<int:user_id>', get_playlists, name='get_playlists'),
    path('playlists/<int:playlist_id>/update', update_playlist, name='update_playlist'),
    path('playlists/<int:playlist_id>/delete', delete_playlist, name='delete_playlist'),
    path('playlists/<int:playlist_id>/add-song', add_song_to_playlist, name='add_song_to_playlist'),
    path('playlists/<int:playlist_id>/remove-song/<int:song_id>', remove_song_from_playlist, name='remove_song_from_playlist'),
]