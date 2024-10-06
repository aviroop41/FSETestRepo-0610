import React, { useEffect, useState } from 'react'; // Import necessary React and useState hooks
import Notifications from '../components/Notifications'; // Import the Notifications component

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]); // State to store notifications

    // Fetch notifications from the API
    const fetchNotifications = async () => {
        const userId = 'exampleUserId'; // Replace with dynamic user ID
        try {
            const response = await fetch(`http://localhost:8080/api/user/${userId}/notifications`);
            const data = await response.json();
            setNotifications(data || mockData); // Set notifications or use mock data
        } catch (error) {
            setNotifications(mockData); // Fallback to mock data
        }
    };

    // Mock data to display in case of API failure
    const mockData = [
        { id: 1, message: 'New song released: "Ocean Waves"', createdAt: '2023-10-01' },
        { id: 2, message: 'Your playlist "Chill Vibes" has been updated.', createdAt: '2023-10-02' },
        { id: 3, message: 'Artist XYZ has released a new album!', createdAt: '2023-10-03' },
    ];

    useEffect(() => {
        fetchNotifications(); // Fetch notifications when the component mounts
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100"> {/* Center the main content */}
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg"> {/* Content container */}
                <h2 className="text-2xl font-bold text-center mb-4">Notifications</h2> {/* Title */}
                <Notifications notifications={notifications} /> {/* Render Notifications component */}
            </div>
        </div>
    );
};

export default NotificationsPage;