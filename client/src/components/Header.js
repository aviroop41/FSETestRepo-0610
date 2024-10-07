import React, { useState } from 'react';
import { FaUser, FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
    // State to manage the theme
    const [theme, setTheme] = useState('light');
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Mock user data for profile dropdown
    const user = {
        name: 'John Doe',
        settings: '#', // Add actual route for profile settings
        logout: '#', // Add actual route for logout
    };

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Brand Name</h1>
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="border rounded-full p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300" 
                />
                <button onClick={toggleTheme} className="ml-4">
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <div className="relative">
                    <button 
                        onClick={() => setDropdownOpen(!isDropdownOpen)} 
                        className="ml-4 flex items-center">
                        <FaUser />
                        <span className="ml-1">Account</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                            <a href={user.settings} className="block px-4 py-2 hover:bg-gray-200">Profile Settings</a>
                            <a href={user.logout} className="block px-4 py-2 hover:bg-gray-200">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;