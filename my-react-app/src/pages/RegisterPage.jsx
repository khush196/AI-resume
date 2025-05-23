 import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { GoogleLogin } from '@react-oauth/google'; 
import './RegisterPage.css'; 
import { FcGoogle } from "react-icons/fc"; 

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

               <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '15px' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        // theme="outline"
                        // size="large"
                        // shape="rectangular"
                        // width="300px" // Example width
                    />
                </div>

                <p className="auth-switch-text">
                    already have an account? <Link to="/login" className="auth-link">login</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;