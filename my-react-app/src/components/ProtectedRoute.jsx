import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext.jsx'; 

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useResume();
    const location = useLocation(); 

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;