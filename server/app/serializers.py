from rest_framework import serializers
from .models import Song, Artist, Album, Playlist, SongStream, SongDetail, Notification
from django.contrib.auth.models import User

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class SongCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['name', 'artist', 'album']

class SongUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['name', 'artist', 'album']

class AlbumCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['title']

class AlbumUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['title']

class SongDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'name', 'album', 'duration']

class SongStreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'name', 'album']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'read']

class StreamReportSerializer(serializers.Serializer):
    song_id = serializers.IntegerField(required=True)
    streams = serializers.IntegerField(required=True)
    date = serializers.DateField(required=True)

class UserEngagementReportSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    engagement_rate = serializers.FloatField(required=True)
    total_streams = serializers.IntegerField(required=True)