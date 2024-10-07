import React, { useEffect, useState } from 'react';

const ProfileManagement = ({ userId }) => {
    const [profile, setProfile] = useState({ username: '', email: '', profile_picture: '' });
    const [savedSongs, setSavedSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/user/${userId}/profile`);
                if (!response.ok) throw new Error('Failed to fetch profile');
                const data = await response.json();
                setProfile(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchSavedSongs = async () => {
            try {
                const response = await fetch(`/api/user/${userId}/saved-songs`);
                if (!response.ok) throw new Error('Failed to fetch saved songs');
                const data = await response.json();
                setSavedSongs(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchPlaylists = async () => {
            try {
                const response = await fetch(`/api/user/${userId}/playlists`);
                if (!response.ok) throw new Error('Failed to fetch playlists');
                const data = await response.json();
                setPlaylists(data);
            } catch (err) {
                setError(err.message);
            }
        };

        Promise.all([fetchProfile(), fetchSavedSongs(), fetchPlaylists()])
            .finally(() => setLoading(false));
    }, [userId]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/user/${userId}/profile/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });
            if (!response.ok) throw new Error('Failed to update profile');
            const updatedProfile = await response.json();
            setProfile(updatedProfile);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="profile-management">
            <form onSubmit={handleUpdateProfile} className="mb-4">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profile_picture">Profile Picture URL</label>
                    <input
                        type="text"
                        id="profile_picture"
                        value={profile.profile_picture}
                        onChange={(e) => setProfile({ ...profile, profile_picture: e.target.value })}
                        className="input"
                    />
                </div>
                <button type="submit" className="btn">Update Profile</button>
            </form>
            <div className="saved-songs">
                <h2>Saved Songs</h2>
                <ul>
                    {savedSongs.map((song) => (
                        <li key={song.id}>{song.title} by {song.artist}</li>
                    ))}
                </ul>
            </div>
            <div className="user-playlists">
                <h2>Your Playlists</h2>
                <ul>
                    {playlists.map((playlist) => (
                        <li key={playlist.id}>{playlist.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProfileManagement;