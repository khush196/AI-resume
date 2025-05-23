import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
          
            <div className="hero-section">
                <h1 className="hero-title">AI-Powered Resume Builder</h1>
                <p className="hero-tagline">
                    Craft professional, ATS-friendly resumes in minutes with Us.
                </p>
                <Link to="/login" className="hero-cta-button">
                    Get Started Now
                </Link>
            </div>
           
            
        </div>
    );
}

export default HomePage;