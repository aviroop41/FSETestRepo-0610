import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import SearchPage from './pages/SearchPage'; 
import PlaylistsPage from './pages/PlaylistsPage'; 
import ProfilePage from './pages/ProfilePage'; 
import CatalogManagementPage from './pages/CatalogManagementPage'; 
import ReportsPage from './pages/ReportsPage'; 
import NotificationsPage from './pages/NotificationsPage'; 
import ArtistFollowPage from './pages/ArtistFollowPage'; 

function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <Header /> 
        <nav className="flex justify-center bg-light p-4 w-full"> 
          <Link to="/" className="mx-4">Home</Link> 
          <Link to="/search" className="mx-4">Search</Link> 
          <Link to="/playlists" className="mx-4">Playlists</Link> 
          <Link to="/profile" className="mx-4">Profile</Link> 
          <Link to="/catalog" className="mx-4">Catalog Management</Link> 
          <Link to="/reports" className="mx-4">Reports</Link> 
          <Link to="/notifications" className="mx-4">Notifications</Link> 
          <Link to="/artist-follow" className="mx-4">Artist Follow</Link> 
        </nav> 
        <Routes> 
          <Route path="/" element={<div className="flex items-center justify-center h-screen"><h1 className="text-2xl">Welcome to the App!</h1></div>} /> 
          <Route path="/search" element={<SearchPage />} /> 
          <Route path="/playlists" element={<PlaylistsPage />} /> 
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="/catalog" element={<CatalogManagementPage />} /> 
          <Route path="/reports" element={<ReportsPage />} /> 
          <Route path="/notifications" element={<NotificationsPage />} /> 
          <Route path="/artist-follow" element={<ArtistFollowPage />} /> 
        </Routes> 
        <Footer /> 
      </div> 
    </Router> 
  ); 
} 

export default App;