import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaList, FaMusic, FaFolderOpen } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 h-full bg-base-100 fixed top-0 left-0 p-4 border-r border-gray-200">
      <nav aria-label="Sidebar Navigation">
        <ul className="space-y-2">
          <li>
            <NavLink to="/" exact activeClassName="bg-gray-200 text-blue-600" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition">
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse" activeClassName="bg-gray-200 text-blue-600" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition">
              <FaList className="mr-2" /> Browse
            </NavLink>
          </li>
          <li>
            <NavLink to="/your-library" activeClassName="bg-gray-200 text-blue-600" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition">
              <FaMusic className="mr-2" /> Your Library
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlists" activeClassName="bg-gray-200 text-blue-600" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition">
              <FaFolderOpen className="mr-2" /> Playlists
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;