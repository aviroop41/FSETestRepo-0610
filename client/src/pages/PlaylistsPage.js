import React, { useEffect, useState } from 'react';
import PlaylistManager from '../components/PlaylistManager';
import PlaylistDetail from '../components/PlaylistDetail';

const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    // Fetch playlists from the API
    const fetchPlaylists = async () => {
        const response = await fetch('http://localhost:8080/api/playlists/1'); // Mock user_id
        const data = await response.json();
        setPlaylists(data || []); // Fallback to empty array on error
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <div className="flex flex-wrap w-full items-center justify-center gap-4">
                <PlaylistManager playlists={playlists} setPlaylists={setPlaylists} setSelectedPlaylist={setSelectedPlaylist} />
                {selectedPlaylist && <PlaylistDetail playlist={selectedPlaylist} />}
            </div>
        </div>
    );
};

export default PlaylistsPage;