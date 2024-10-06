import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 py-4 fixed bottom-0 w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-gray-600 dark:text-gray-300">
                    &copy; {new Date().getFullYear()} Your Company Name
                </div>
                <div className="flex space-x-4">
                    <a href="/about" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">About</a>
                    <a href="/contact" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">Contact</a>
                    <a href="/help" className="text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">Help</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;