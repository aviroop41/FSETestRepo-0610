import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import Recommendations from '../components/Recommendations'; // Import Recommendations component

const HomePage = () => {
  const [recommendations, setRecommendations] = useState([]); // State to hold recommendations
  const userId = '12345'; // Assume a user ID for fetching recommendations

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/recommendations`);
      const data = await response.json(); // Fetch data from the API
      setRecommendations(data || mockData); // Set data or mock data on failure
    };

    fetchRecommendations(); // Call the fetch function
  }, []);

  const mockData = [ // Mock data for fallback
    { id: 1, title: 'Song One', artist: 'Artist A', album: 'Album A' },
    { id: 2, title: 'Song Two', artist: 'Artist B', album: 'Album B' },
    { id: 3, title: 'Song Three', artist: 'Artist C', album: 'Album C' },
  ];

  return (
    <main className="flex flex-col items-center justify-center p-4"> 
      <section className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Your Recommendations</h2>
        <Recommendations data={recommendations} /> {/* Pass recommendations to the Recommendations component */}
      </section>
    </main>
  );
};

export default HomePage;