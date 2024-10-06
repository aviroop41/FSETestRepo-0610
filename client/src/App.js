import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import './App.css'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import SearchPage from './pages/SearchPage'; 

function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <Header /> 
        <nav className="flex justify-center bg-light p-4"> 
          <Link to="/" className="mx-4">Home</Link> 
          <Link to="/search" className="mx-4">Search</Link> 
        </nav> 
        <Routes> 
          <Route path="/" element={<div className="flex items-center justify-center h-screen"><h1 className="text-2xl">Welcome to the App!</h1></div>} /> 
          <Route path="/search" element={<SearchPage />} /> 
        </Routes> 
        <Footer /> 
      </div> 
    </Router> 
  ); 
} 

export default App;