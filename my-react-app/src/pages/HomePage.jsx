// my-react-app/src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // We'll create this for styling

function HomePage() {
    return (
        <div className="home-page">
            {/* Navbar will be rendered globally by App.jsx now */}
            <div className="hero-section">
                <h1 className="hero-title">AI-Powered Resume Builder</h1>
                <p className="hero-tagline">
                    Craft professional, ATS-friendly resumes in minutes with Us.
                </p>
                <Link to="/build" className="hero-cta-button">
                    Get Started Now
                </Link>
            </div>
            {/* You can add more sections to your landing page below */}
            {/* <section className="features-section"> ... </section> */}
            {/* <section className="testimonials-section"> ... </section> */}
        </div>
    );
}

export default HomePage;