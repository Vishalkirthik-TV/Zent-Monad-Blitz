import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Import Navbar (optional use inside pages or global)
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar is included in specific pages or can be global. 
            For Home it's inside Home.jsx. 
            For Dashboard/ProjectDetails we might want it too. 
            Let's keep it flexible or make it global layout later. 
            For now, I added it inside Home.jsx, forcing it globally might break Login design if not careful.
            Actually, let's just use Routes for now and let pages handle layout.
        */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
          <Route path="/project/:id" element={<><Navbar /><ProjectDetails /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
