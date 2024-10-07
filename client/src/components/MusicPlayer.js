import React, { useEffect, useState } from 'react';

const MusicPlayer = () => {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await fetch('/api/songs'); // Mock data retrieval, adjust as needed
            const data = await response.json();
            setSongs(data || mockSongs); // Use mock data if fetch fails
        } catch (error) {
            console.error('Error fetching songs:', error);
            setSongs(mockSongs); // Use mock data on error
        }
    };

    const playSong = () => setIsPlaying(true);
    const pauseSong = () => setIsPlaying(false);
    const skipToNext = () => setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    const skipToPrevious = () => setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    
    const handleVolumeChange = (e) => setVolume(e.target.value);

    const mockSongs = [
        { id: 1, title: 'Song One', artist: 'Artist One' },
        { id: 2, title: 'Song Two', artist: 'Artist Two' },
        { id: 3, title: 'Song Three', artist: 'Artist Three' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button onClick={skipToPrevious} className="text-gray-600 hover:text-gray-900">
                    {/* Previous Icon */}
                </button>
                {isPlaying ? (
                    <button onClick={pauseSong} className="text-gray-600 hover:text-gray-900">
                        {/* Pause Icon */}
                    </button>
                ) : (
                    <button onClick={playSong} className="text-gray-600 hover:text-gray-900">
                        {/* Play Icon */}
                    </button>
                )}
                <button onClick={skipToNext} className="text-gray-600 hover:text-gray-900">
                    {/* Next Icon */}
                </button>
            </div>
            <div className="flex-1 text-center">
                <h2 className="text-lg font-semibold">{songs[currentSongIndex]?.title || 'No Song'}</h2>
                <p className="text-sm">{songs[currentSongIndex]?.artist || ''}</p>
            </div>
            <div className="flex items-center space-x-2">
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className="cursor-pointer"
                />
                <span className="text-gray-600">{volume}</span>
            </div>
        </div>
    );
};

export default MusicPlayer;