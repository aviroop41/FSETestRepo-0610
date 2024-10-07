import React, { useEffect, useState } from 'react';

const FollowArtists = ({ userId }) => {
  const [artists, setArtists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);

  // Fetch followed artists
  const fetchFollowedArtists = async () => {
    try {
      const response = await fetch(`/api/user/${userId}/followed-artists`);
      const data = await response.json();
      setFollowedArtists(data);
    } catch (error) {
      // Mock data in case of fetch failure
      setFollowedArtists([{ id: 1, name: 'Artist A' }, { id: 2, name: 'Artist B' }]);
    }
  };

  // Fetch available artists (or could be a prop or context)
  const fetchArtists = async () => {
    try {
      // Mock data for demonstration
      setArtists([{ id: 1, name: 'Artist A' }, { id: 2, name: 'Artist B' }, { id: 3, name: 'Artist C' }]);
    } catch (error) {
      // handle error
    }
  };

  const handleFollow = async (artistId) => {
    try {
      await fetch(`/api/user/${userId}/follow-artist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artist_id: artistId }),
      });
      fetchFollowedArtists(); // Refresh followed artists
    } catch (error) {
      // handle error
    }
  };

  const handleUnfollow = async (artistId) => {
    try {
      await fetch(`/api/user/${userId}/unfollow-artist/${artistId}`, { method: 'DELETE' });
      fetchFollowedArtists(); // Refresh followed artists
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    fetchFollowedArtists();
    fetchArtists();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Follow Artists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <div key={artist.id} className="border rounded-lg shadow p-4 flex justify-between items-center">
            <span>{artist.name}</span>
            {followedArtists.some(followed => followed.id === artist.id) ? (
              <button onClick={() => handleUnfollow(artist.id)} className="btn btn-danger">Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(artist.id)} className="btn btn-primary">Follow</button>
            )}
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">Followed Artists</h2>
      <ul>
        {followedArtists.map((artist) => (
          <li key={artist.id} className="border-b py-2">{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowArtists;