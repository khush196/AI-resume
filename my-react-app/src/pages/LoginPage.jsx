import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; 
import { useResume } from '../contexts/ResumeContext.jsx';
import './LoginPage.css'; 
import { FcGoogle } from "react-icons/fc";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { loginUser } = useResume();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/build";
    navigate(from, { replace: true });

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        console.log('Attempting login with:', { email, password });
        if (email === "test@example.com" && password === "password") {
            const mockUserData = { email, name: "Test User", id_token: "mock_jwt_token_form_login" };
            loginUser(mockUserData); 
            navigate(from, { replace: true }); 
        } else {
            setError('Invalid email or password (demo).');
        }
    };

       
        const handleGoogleSuccess = (credentialResponse) => {
        console.log('Google Login Success:', credentialResponse);
        
        try {
            const decodedToken = jwtDecode(credentialResponse.credential);
            console.log("Decoded Google Token:", decodedToken);
            const userData = {
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture,
                id_token: credentialResponse.credential 
            };
            loginUser(userData); 
            navigate(from, { replace: true }); 
        } catch (error) {
            console.error("Error decoding Google token:", error);
            setError("Failed to process Google login.");
        }
    };

    const handleGoogleFailure = (errorResponse) => {
        console.error('Google Login Failure:', errorResponse);
        setError('Google login failed. Please try again.');
    };


    return (
        <div className="auth-page-container"> 
            <div className="auth-form-container"> 
                <h1 className="auth-title">login</h1>
                <p className="auth-subtitle">enter your email below to login to your account</p>

                {error && <p className="auth-error-message">{error}</p>}

                <form onSubmit={handleLogin} className="auth-form">
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
                    <button type="submit" className="auth-button">
                        login
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
                    don't have an account? <Link to="/register" className="auth-link">sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;