from django.urls import path
from .views import search, create_playlist, get_playlists, update_playlist, delete_playlist, add_song_to_playlist, remove_song_from_playlist, get_user_profile, update_user_profile, add_song, update_song, delete_song, add_album, update_album, delete_album, stream_song, get_song_details, generate_stream_reports, generate_user_engagement_reports, get_notifications, mark_notification_as_read

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
    path('api/songs/<int:song_id>/stream', stream_song, name='stream_song'),
    path('api/songs/<int:song_id>', get_song_details, name='get_song_details'),
    path('api/admin/reports/streams', generate_stream_reports, name='generate_stream_reports'),
    path('api/admin/reports/user-engagement', generate_user_engagement_reports, name='generate_user_engagement_reports'),
    path('api/user/<int:user_id>/notifications', get_notifications, name='get_notifications'),
    path('api/user/<int:user_id>/notifications/<int:notification_id>/read', mark_notification_as_read, name='mark_notification_as_read'),
]