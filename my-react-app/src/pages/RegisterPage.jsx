import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useResume } from '../contexts/ResumeContext.jsx';
import './RegisterPage.css'; 
import { FcGoogle } from "react-icons/fc";


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useResume(); 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/build"; 
    navigate(from, { replace: true });

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        console.log('Attempting to register with:', { email, password });
    
        alert('Email/Password registration successful (simulated)! Please login.');
        navigate('/login');
    };

    const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Sign-up Success:', credentialResponse);
        setError('');
        try {
            const decodedToken = jwtDecode(credentialResponse.credential);
            console.log("Decoded Google Token for Sign-up:", decodedToken);
            const userData = {
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                id_token: credentialResponse.credential 
            };
            
            loginUser(userData);
            navigate(from, { replace: true }); 
        } catch (error) {
            console.error("Error decoding Google token during sign-up:", error);
            setError("Failed to process Google sign-up.");
        }
    };

    const handleGoogleFailure = (errorResponse) => {
        console.error('Google Sign-up Failure:', errorResponse);
        let errorMessage = 'Google sign-up failed. Please try again.';
        if (errorResponse && errorResponse.error === 'popup_closed_by_user') {
            errorMessage = 'Google sign-up was cancelled.';
        } else if (errorResponse && errorResponse.error) {
            errorMessage = `Google sign-up error: ${errorResponse.error}`;
        }
        setError(errorMessage);
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
                            placeholder="Enter your password (min. 6 chars)"
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
                        // customize the button further with props like:
                        // theme="outline"
                        // size="large"
                        // shape="rectangular"
                        // width="calc(100% - 20px)" 
                        // text="signup_with" 
                        useOneTap 
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