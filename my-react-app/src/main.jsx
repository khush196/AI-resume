import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import './index.css';
import App from './App.jsx';
import { ResumeProvider } from './contexts/ResumeContext.jsx';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}> 
      <BrowserRouter>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
);