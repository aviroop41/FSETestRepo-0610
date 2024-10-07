from .models import Song, SongStream
from django.contrib.auth.models import User
from collections import Counter

class RecommendationService:
    @staticmethod
    def generate_recommendations(user_id):
        user = User.objects.get(id=user_id)
        streams = SongStream.objects.filter(user_id=user.id)
        song_ids = [stream.song.id for stream in streams]

        if not song_ids:
            return []

        # Get the most streamed songs
        song_counts = Counter(song_ids)
        most_common_songs = song_counts.most_common(10)
        recommended_songs = [Song.objects.get(id=song_id) for song_id, _ in most_common_songs]

        return recommended_songs

    @staticmethod
    def serialize_songs(songs):
        return [{'id': song.id, 'name': song.name, 'album': song.album.title, 'duration': str(song.duration)} for song in songs]