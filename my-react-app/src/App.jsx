import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import HomePage from './pages/HomePage';  
import BuilderPage from './pages/BuilderPage'; 
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage.jsx';    
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import './App.css'; 
import './components/Templates/Template1.css';
import './components/Templates/Template2.css';
import './components/Templates/Template3.css';


const PricingPage = () => <div style={{padding: '50px', textAlign: 'center'}}><h2>Pricing</h2><p>Comming Soon..!</p></div>;


function App() {
  return (
    <> 
      <Navbar /> 
      <div className="page-content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
          path="/build"
          element={
            <ProtectedRoute> 
              <BuilderPage />
            </ProtectedRoute>
         }
        />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
           <Route path="/login" element={<LoginPage />} />         
          <Route path="/register" element={<RegisterPage />} />   
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;