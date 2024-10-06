import React, { useState, useEffect } from 'react'; // Import necessary hooks
import CatalogManagement from '../components/CatalogManagement'; // Import the CatalogManagement component

const CatalogManagementPage = () => {
    const [songs, setSongs] = useState([]); // State for songs
    const [albums, setAlbums] = useState([]); // State for albums

    useEffect(() => {
        // Fetch songs and albums from the API and set the state
        const fetchData = async () => {
            const songsResponse = await fetch('http://localhost:8080/api/admin/songs'); // Fetch songs
            const albumsResponse = await fetch('http://localhost:8080/api/admin/albums'); // Fetch albums
            
            const songsData = await songsResponse.json(); // Parse songs data
            const albumsData = await albumsResponse.json(); // Parse albums data
            
            setSongs(songsData || mockSongsData); // Set songs or use mock data
            setAlbums(albumsData || mockAlbumsData); // Set albums or use mock data
        };
        fetchData(); // Call the fetch function
    }, []);

    // Mock data for songs
    const mockSongsData = [
        { id: 1, title: 'Song One', artist: 'Artist A', album: 'Album One', genre: 'Pop', release_date: '2023-01-01', duration: '3:30', audio_file: 'song1.mp3' },
        { id: 2, title: 'Song Two', artist: 'Artist B', album: 'Album Two', genre: 'Rock', release_date: '2023-02-01', duration: '4:00', audio_file: 'song2.mp3' },
    ];

    // Mock data for albums
    const mockAlbumsData = [
        { id: 1, album_name: 'Album One', artist: 'Artist A', release_date: '2023-01-01', cover_art: 'cover1.jpg' },
        { id: 2, album_name: 'Album Two', artist: 'Artist B', release_date: '2023-02-01', cover_art: 'cover2.jpg' },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-8">
            <h1 className="text-2xl font-bold mb-6">Manage Music Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <CatalogManagement songs={songs} albums={albums} setSongs={setSongs} setAlbums={setAlbums} />
            </div>
        </div>
    );
};

export default CatalogManagementPage;