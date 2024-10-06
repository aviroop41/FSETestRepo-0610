import React, { useState, useEffect } from 'react';

const PlaylistDetail = ({ playlistId }) => {
    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8080/api/playlists/${playlistId}`)
            .then(response => response.json())
            .then(data => setSongs(data.songs))
            .catch(() => {
                // Mock data in case of API failure
                setSongs([
                    { id: 1, title: 'Song One' },
                    { id: 2, title: 'Song Two' },
                    { id: 3, title: 'Song Three' }
                ]);
            });
    }, [playlistId]);

    const addSong = () => {
        if (newSong.trim() === '') {
            setError('Please enter a song title.');
            return;
        }

        fetch(`http://localhost:8080/api/playlists/${playlistId}/add-song`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newSong })
        })
        .then(response => response.json())
        .then(data => {
            setSongs(prevSongs => [...prevSongs, data.song]);
            setNewSong('');
            setError('');
        })
        .catch(err => setError('Failed to add song.'));
    };

    const removeSong = (songId) => {
        fetch(`http://localhost:8080/api/playlists/${playlistId}/remove-song/${songId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
        })
        .catch(() => setError('Failed to remove song.'));
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Playlist Details</h2>
            <div>
                <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    placeholder="Add a new song"
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                />
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <button onClick={addSong} className="btn btn-primary">Add Song</button>
            </div>
            <ul className="mt-4">
                {songs.map(song => (
                    <li key={song.id} className="flex justify-between items-center border-b py-2">
                        <span>{song.title}</span>
                        <button onClick={() => removeSong(song.id)} className="btn btn-danger">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistDetail;