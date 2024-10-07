import React, { useEffect, useState } from 'react';

// UserPlaylists Component
const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const userId = '1'; // Replace with dynamic user ID as needed

  useEffect(() => {
    // Fetch playlists from the API
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/playlists`);
        if (!response.ok) throw new Error('Failed to fetch playlists');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        // Fallback mock data in case of error
        setPlaylists([
          { id: 1, name: 'Chill Vibes', songs: 10 },
          { id: 2, name: 'Workout Hits', songs: 15 },
          { id: 3, name: 'Top 100', songs: 20 },
        ]);
      }
    };

    fetchPlaylists();
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
      <ul role="list" className="space-y-3">
        {playlists.map(playlist => (
          <li key={playlist.id} className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
            <h3 className="font-semibold">{playlist.name}</h3>
            <p className="text-gray-600">{playlist.songs} songs</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylists;