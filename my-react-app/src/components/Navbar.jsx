import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import './Navbar.css'; 

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    AI Resume Pro 
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                    {/* Simple text fallback if you don't have Font Awesome icons */}
                    {/* {isMenuOpen ? 'Close' : 'Menu'} */}
                </div>

                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pricing" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                            Pricing
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={() => setIsMenuOpen(false)}>
                            Contact
                        </Link>
                    </li>
                     <li className="nav-item">
        <Link to="/login" className="nav-links" onClick={() => setIsMenuOpen(false)}>
            Login
        </Link>
    </li>
     <li className="nav-item nav-item-builder"> 
        <Link to="/login" className="nav-links nav-links-builder" onClick={() => setIsMenuOpen(false)}>
            Build Resume
        </Link>
    </li>
                   
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;