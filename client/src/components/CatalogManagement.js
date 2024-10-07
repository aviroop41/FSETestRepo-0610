import React, { useState, useEffect } from 'react';

const CatalogManagement = () => {
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        release_date: '',
        duration: '',
        audio_file: null,
    });
    const [albumData, setAlbumData] = useState({
        album_name: '',
        artist: '',
        release_date: '',
        cover_art: null,
    });

    useEffect(() => {
        fetchSongs();
        fetchAlbums();
    }, []);

    const fetchSongs = async () => {
        // Mock data in case fetch fails
        const mockSongs = [
            { id: 1, title: 'Song One', artist: 'Artist One', album: 'Album One' },
            { id: 2, title: 'Song Two', artist: 'Artist Two', album: 'Album Two' },
        ];
        setSongs(mockSongs);
    };

    const fetchAlbums = async () => {
        // Mock data in case fetch fails
        const mockAlbums = [
            { id: 1, album_name: 'Album One', artist: 'Artist One' },
            { id: 2, album_name: 'Album Two', artist: 'Artist Two' },
        ];
        setAlbums(mockAlbums);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAlbumInputChange = (e) => {
        const { name, value } = e.target;
        setAlbumData({ ...albumData, [name]: value });
    };

    const addSong = async () => {
        // Code to add song via API call
    };

    const updateSong = async (id) => {
        // Code to update song via API call
    };

    const deleteSong = async (id) => {
        // Code to delete song via API call
    };

    const addAlbum = async () => {
        // Code to add album via API call
    };

    const updateAlbum = async (id) => {
        // Code to update album via API call
    };

    const deleteAlbum = async (id) => {
        // Code to delete album via API call
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Manage Songs</h2>
            <form onSubmit={addSong} className="mb-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input w-full mb-2"
                    placeholder="Title"
                    required
                />
                <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="input w-full mb-2"
                    placeholder="Artist"
                    required
                />
                <button type="submit" className="btn btn-primary">Add Song</button>
            </form>
            <ul>
                {songs.map(song => (
                    <li key={song.id} className="flex justify-between">
                        {song.title} - {song.artist}
                        <div>
                            <button onClick={() => updateSong(song.id)} className="btn">Edit</button>
                            <button onClick={() => deleteSong(song.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <h2 className="text-xl font-bold mt-6">Manage Albums</h2>
            <form onSubmit={addAlbum} className="mb-4">
                <input
                    type="text"
                    name="album_name"
                    value={albumData.album_name}
                    onChange={handleAlbumInputChange}
                    className="input w-full mb-2"
                    placeholder="Album Name"
                    required
                />
                <input
                    type="text"
                    name="artist"
                    value={albumData.artist}
                    onChange={handleAlbumInputChange}
                    className="input w-full mb-2"
                    placeholder="Artist"
                    required
                />
                <button type="submit" className="btn btn-primary">Add Album</button>
            </form>
            <ul>
                {albums.map(album => (
                    <li key={album.id} className="flex justify-between">
                        {album.album_name} - {album.artist}
                        <div>
                            <button onClick={() => updateAlbum(album.id)} className="btn">Edit</button>
                            <button onClick={() => deleteAlbum(album.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatalogManagement;