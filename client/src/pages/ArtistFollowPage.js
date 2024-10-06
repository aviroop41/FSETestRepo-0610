import React, { useEffect, useState } from 'react';
import FollowArtists from '../components/FollowArtists';

const ArtistFollowPage = () => {
    const [followedArtists, setFollowedArtists] = useState([]);
    
    useEffect(() => {
        // Fetch followed artists when the component mounts
        const fetchFollowedArtists = async () => {
            const userId = "123"; // Replace with dynamic user ID
            const response = await fetch(`http://localhost:8080/api/user/${userId}/followed-artists`);
            const data = await response.json();
            setFollowedArtists(data);
        };
        fetchFollowedArtists();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* FollowArtists component to manage following/unfollowing artists */}
                <FollowArtists followedArtists={followedArtists} />
            </div>
        </div>
    );
};

export default ArtistFollowPage;