from rest_framework import serializers

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

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'

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