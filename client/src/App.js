import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import SearchPage from './pages/SearchPage'; 
import PlaylistsPage from './pages/PlaylistsPage'; 

function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <Header /> 
        <nav className="flex justify-center bg-light p-4 w-full"> 
          <Link to="/" className="mx-4">Home</Link> 
          <Link to="/search" className="mx-4">Search</Link> 
          <Link to="/playlists" className="mx-4">Playlists</Link> 
        </nav> 
        <Routes> 
          <Route path="/" element={<div className="flex items-center justify-center h-screen"><h1 className="text-2xl">Welcome to the App!</h1></div>} /> 
          <Route path="/search" element={<SearchPage />} /> 
          <Route path="/playlists" element={<PlaylistsPage />} /> 
        </Routes> 
        <Footer /> 
      </div> 
    </Router> 
  ); 
} 

export default App;