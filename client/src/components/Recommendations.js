import React, { useEffect, useState } from 'react';

// Recommendations component to display personalized song recommendations
const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  // Fetching recommendations from the API
  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/recommendations`);
      if (!response.ok) {
        // Mock data if API fails
        const mockData = [
          { id: 1, title: 'Song One', artist: 'Artist A', album: 'Album A' },
          { id: 2, title: 'Song Two', artist: 'Artist B', album: 'Album B' },
          { id: 3, title: 'Song Three', artist: 'Artist C', album: 'Album C' },
        ];
        setRecommendations(mockData);
        return;
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error by setting mock data
      const mockData = [
        { id: 1, title: 'Song One', artist: 'Artist A', album: 'Album A' },
        { id: 2, title: 'Song Two', artist: 'Artist B', album: 'Album B' },
        { id: 3, title: 'Song Three', artist: 'Artist C', album: 'Album C' },
      ];
      setRecommendations(mockData);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userId]);

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((song) => (
          <div key={song.id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
            <p className="text-gray-400 text-sm">{song.album}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;