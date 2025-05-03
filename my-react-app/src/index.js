import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import global styles
import App from './App.jsx'; // Updated extension to .jsx
import { ResumeProvider } from './contexts/ResumeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
     <ResumeProvider>
  <App />
</ResumeProvider>
  </React.StrictMode>
);