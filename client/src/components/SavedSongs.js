import React, { useEffect, useState } from 'react';

const SavedSongs = () => {
    const [savedSongs, setSavedSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Mock data in case of API failure
    const mockData = [
        { id: 1, title: 'Song One', artist: 'Artist One' },
        { id: 2, title: 'Song Two', artist: 'Artist Two' },
        { id: 3, title: 'Song Three', artist: 'Artist Three' },
    ];
    
    // Fetch saved songs from the API
    const fetchSavedSongs = async () => {
        try {
            const response = await fetch('/api/user/{user_id}/saved-songs');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSavedSongs(data);
        } catch (error) {
            console.error('Fetching error:', error);
            setSavedSongs(mockData); // Use mock data on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedSongs();
    }, []);
    
    if (loading) return <div className="text-center">Loading...</div>;
    
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Saved Songs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedSongs.map(song => (
                    <div key={song.id} className="card bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow">
                        <h3 className="text-lg font-semibold">{song.title}</h3>
                        <p className="text-gray-600">{song.artist}</p>
                        <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Play</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedSongs;