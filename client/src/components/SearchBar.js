import React, { useState, useEffect } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/search?query=${query}`);
            if (!response.ok) throw new Error('Error fetching data');
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Failed to fetch results');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Handle empty query case to reset results
        if (query === '') setResults([]);
    }, [query]);

    return (
        <div className="relative">
            <form onSubmit={handleSearch} className="flex flex-col">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search for songs, artists, or albums..."
                    aria-label="Search bar"
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </form>
            {loading && <div className="absolute mt-2 text-gray-500">Loading...</div>}
            {error && <div className="absolute mt-2 text-red-500">{error}</div>}
            {results && results.length > 0 && (
                <ul className="absolute mt-2 w-full bg-white border rounded shadow-lg">
                    {results.map((result, index) => (
                        <li key={index} className="p-2 hover:bg-gray-100">
                            {result.name} - {result.artist}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;