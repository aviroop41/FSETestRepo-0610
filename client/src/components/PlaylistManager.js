import React, { useEffect, useState } from 'react';

const PlaylistManager = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Fetch playlists from the server
    useEffect(() => {
        const fetchPlaylists = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/playlists/1');
                const data = await response.json();
                setPlaylists(data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
                // Use mock data if fetch fails
                setPlaylists([{ id: 1, name: 'My Favorite Songs' }, { id: 2, name: 'Chill Vibes' }]);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    // Add a new playlist
    const handleCreatePlaylist = async () => {
        if (newPlaylistName.trim() === '') return;

        try {
            const response = await fetch('http://localhost:8080/api/playlists/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newPlaylistName })
            });
            const createdPlaylist = await response.json();
            setPlaylists([...playlists, createdPlaylist]);
            setNewPlaylistName('');
        } catch (error) {
            console.error("Error creating playlist:", error);
        }
    };

    // Delete a playlist
    const handleDeletePlaylist = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/playlists/${id}/delete`, { method: 'DELETE' });
            setPlaylists(playlists.filter(playlist => playlist.id !== id));
        } catch (error) {
            console.error("Error deleting playlist:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Manage Your Playlists</h2>
            <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New Playlist Name"
                className="input-bordered w-full mb-2"
                aria-label="New Playlist Name"
            />
            <button onClick={handleCreatePlaylist} className="btn btn-primary mb-4">Create Playlist</button>
            {loading ? (
                <p>Loading playlists...</p>
            ) : (
                <ul className="space-y-2">
                    {playlists.map((playlist) => (
                        <li key={playlist.id} className="flex justify-between items-center p-2 border rounded">
                            <span>{playlist.name}</span>
                            <button onClick={() => handleDeletePlaylist(playlist.id)} className="btn btn-danger">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlaylistManager;