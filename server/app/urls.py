from django.urls import path
from .views import search, create_playlist, get_playlists, update_playlist, delete_playlist, add_song_to_playlist, remove_song_from_playlist, get_user_profile, update_user_profile, add_song, update_song, delete_song, add_album, update_album, delete_album

urlpatterns = [
    path('search', search, name='search'),
    path('playlists/create', create_playlist, name='create_playlist'),
    path('playlists/<int:user_id>', get_playlists, name='get_playlists'),
    path('playlists/<int:playlist_id>/update', update_playlist, name='update_playlist'),
    path('playlists/<int:playlist_id>/delete', delete_playlist, name='delete_playlist'),
    path('playlists/<int:playlist_id>/add-song', add_song_to_playlist, name='add_song_to_playlist'),
    path('playlists/<int:playlist_id>/remove-song/<int:song_id>', remove_song_from_playlist, name='remove_song_from_playlist'),
    path('user/<int:user_id>/profile', get_user_profile, name='get_user_profile'),
    path('user/<int:user_id>/profile/update', update_user_profile, name='update_user_profile'),
    path('admin/songs/add', add_song, name='add_song'),
    path('admin/songs/<int:song_id>/update', update_song, name='update_song'),
    path('admin/songs/<int:song_id>/delete', delete_song, name='delete_song'),
    path('admin/albums/add', add_album, name='add_album'),
    path('admin/albums/<int:album_id>/update', update_album, name='update_album'),
    path('admin/albums/<int:album_id>/delete', delete_album, name='delete_album'),
]