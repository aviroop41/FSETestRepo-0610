import React, { useEffect, useState } from 'react';
import ProfileManagement from '../components/ProfileManagement';
import SavedSongs from '../components/SavedSongs';
import UserPlaylists from '../components/UserPlaylists';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState({});
    const [savedSongs, setSavedSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    
    const userId = 1; // Replace with actual user ID retrieval logic

    // Fetch user profile information
    const fetchProfile = async () => {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/profile`);
        const data = await response.json();
        setUserProfile(data);
    };

    // Fetch saved songs
    const fetchSavedSongs = async () => {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/saved-songs`);
        const data = await response.json();
        setSavedSongs(data);
    };

    // Fetch user playlists
    const fetchPlaylists = async () => {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/playlists`);
        const data = await response.json();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchProfile();
        fetchSavedSongs();
        fetchPlaylists();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
                <div className="col-span-1 md:col-span-1">
                    <ProfileManagement userProfile={userProfile} />
                </div>
                <div className="col-span-1 md:col-span-1">
                    <SavedSongs songs={savedSongs} />
                </div>
                <div className="col-span-1 md:col-span-1">
                    <UserPlaylists playlists={playlists} />
                </div>
            </div>
        </main>
    );
}

export default ProfilePage;