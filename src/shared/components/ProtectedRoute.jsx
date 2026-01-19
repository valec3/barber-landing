import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // Note: In a real app we might want a loading state from AuthContext 
    // but for now we assume AuthContext handles initial load before rendering children
    // (which we implemented in AuthProvider via the !loading check)

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
