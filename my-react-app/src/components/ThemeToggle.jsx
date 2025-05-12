import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons
import './ThemeToggle.css'; // We'll create this CSS file next

function ThemeToggle() {
    const { theme, toggleTheme } = useResume();

    return (
        <button
            className={`theme-toggle-button ${theme}`} // Add theme class for potential specific styling
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="icon-container">
                {/* Apply classes to icons for animation control */}
                <FaSun className={`icon sun ${theme === 'light' ? 'active' : ''}`} />
                <FaMoon className={`icon moon ${theme === 'dark' ? 'active' : ''}`} />
            </div>
        </button>
    );
}

export default ThemeToggle;