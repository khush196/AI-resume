// my-react-app/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import './RegisterPage.css'; // We'll create this CSS file
import { FcGoogle } from "react-icons/fc"; // Google icon

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added for password confirmation
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleRegister = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Placeholder for actual registration logic
        console.log('Registering with:', { email, password });
        // Simulate successful registration for now
        alert('Registration successful (simulated)! Redirecting to login...');
        navigate('/login'); // Redirect to login page after "successful" registration
    };

    const handleGoogleRegister = () => {
        // Placeholder for Google registration logic
        console.log('Registering with Google...');
        alert('Google registration not yet implemented. Redirecting to build page for demo.');
        navigate('/build'); // Or to a dashboard if you had one
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-container">
                <h1 className="auth-title">register</h1>
                <p className="auth-subtitle">create your account</p>

                {error && <p className="auth-error-message">{error}</p>}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="auth-form-group">
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="auth-form-group">
                        <label htmlFor="confirmPassword">confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        register
                    </button>
                </form>

                <div className="auth-separator">
                    <span>or</span>
                </div>

                <button onClick={handleGoogleRegister} className="auth-google-button">
                    <FcGoogle size={22} style={{ marginRight: '10px' }} />
                    register with google
                </button>

                <p className="auth-switch-text">
                    already have an account? <Link to="/login" className="auth-link">login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;