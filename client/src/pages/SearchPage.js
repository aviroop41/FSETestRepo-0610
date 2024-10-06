import React, { useState } from 'react'; // Import React and useState hook
import SearchBar from '../components/SearchBar'; // Import SearchBar component

const SearchPage = () => {
    const [results, setResults] = useState({ songs: [], artists: [], albums: [] }); // State for results

    // Fetch data from API
    const fetchData = async (query) => {
        const response = await fetch(`http://localhost:8080/api/search?query=${query}`);
        const data = await response.json();
        setResults(data); // Set results from API response
    };

    return (
        <div className="flex flex-col items-center justify-between w-full h-screen p-4 bg-base-100">
            <SearchBar onSearch={fetchData} /> {/* Render SearchBar component */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mt-8"> {/* Responsive grid for results */}
                {results.songs.length > 0 && (
                    <div className="card bg-white shadow-md p-4">
                        <h2 className="text-xl font-bold">Songs</h2>
                        {results.songs.map((song) => (
                            <div key={song.id} className="border-b py-2">{song.title}</div>
                        ))}
                    </div>
                )}
                {results.artists.length > 0 && (
                    <div className="card bg-white shadow-md p-4">
                        <h2 className="text-xl font-bold">Artists</h2>
                        {results.artists.map((artist) => (
                            <div key={artist.id} className="border-b py-2">{artist.name}</div>
                        ))}
                    </div>
                )}
                {results.albums.length > 0 && (
                    <div className="card bg-white shadow-md p-4">
                        <h2 className="text-xl font-bold">Albums</h2>
                        {results.albums.map((album) => (
                            <div key={album.id} className="border-b py-2">{album.title}</div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage; // Export SearchPage component