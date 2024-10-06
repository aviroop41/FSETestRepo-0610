from django.db import models
from django.contrib.auth.models import User
from .models import Artist

class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


def follow_artist(user_id, artist_id):
    user = User.objects.get(id=user_id)
    artist = Artist.objects.get(id=artist_id)
    Follow.objects.create(user=user, artist=artist)
    return {'message': 'Successfully followed artist.'}


def unfollow_artist(user_id, artist_id):
    user = User.objects.get(id=user_id)
    artist = Artist.objects.get(id=artist_id)
    Follow.objects.filter(user=user, artist=artist).delete()
    return {'message': 'Successfully unfollowed artist.'}


def get_followed_artists(user_id):
    user = User.objects.get(id=user_id)
    followed_artists = Follow.objects.filter(user=user).select_related('artist')
    return [follow.artist.name for follow in followed_artists]