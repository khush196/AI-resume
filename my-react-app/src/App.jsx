// my-react-app/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Navbar from './components/Navbar'; // Your Navbar
import HomePage from './pages/HomePage';   // Your new HomePage
import BuilderPage from './pages/BuilderPage'; // Your new BuilderPage
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Import your global styles if not already in main.jsx or index.js
import './App.css'; // Contains general layout styles, maybe some global styles too
// Template CSS files should ideally be imported where they are used or globally if simple
import './components/Templates/Template1.css';
import './components/Templates/Template2.css';
import './components/Templates/Template3.css';

// Placeholder components for About, Pricing, Contact (create these later)

const PricingPage = () => <div style={{padding: '50px', textAlign: 'center'}}><h2>Pricing</h2><p>Details about your pricing plans.</p></div>;


function App() {
  return (
    <> {/* Use Fragment because BrowserRouter will be the top-level in main.jsx */}
      <Navbar /> {/* Navbar will be displayed on all pages */}
      <div className="page-content-container"> {/* Optional: for consistent padding/margin below navbar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/build" element={<BuilderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;