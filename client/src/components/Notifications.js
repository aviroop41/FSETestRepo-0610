import React, { useEffect, useState } from 'react';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${userId}/notifications`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err);
      setNotifications([
        { id: 1, message: "New song released: Example Song", read: false },
        { id: 2, message: "Playlist updated: Example Playlist", read: false },
        { id: 3, message: "Artist released a new album!", read: false }
      ]);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:8080/api/user/${userId}/notifications/${notificationId}/read`, { method: 'POST' });
      setNotifications(notifications.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn m-1">Notifications</label>
      <ul tabIndex="0" className="dropdown-content menu shadow bg-base-100 rounded-box w-64">
        {error ? (
          <li className="p-2">Error fetching notifications</li>
        ) : notifications.map(notification => (
          <li key={notification.id} className={notification.read ? "opacity-50" : ""}>
            <span>{notification.message}</span>
            {!notification.read && (
              <button className="btn btn-xs btn-primary ml-2" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;