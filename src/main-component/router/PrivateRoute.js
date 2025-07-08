// src/main-component/router/PrivateRoute.js

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const location = useLocation();
    const params = useParams(); // Get URL parameters like :userId

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    const loggedInUserId = user.email; // DEMO: Using email as a unique ID.
    const routeOwnerId = params.userId; // Get the ID from the URL, e.g., 'user@example.com'

    if (routeOwnerId && routeOwnerId !== loggedInUserId) {
        toast.error("Access Denied: You cannot access another user's data.");
        return <Navigate to={`/user/${loggedInUserId}/dashboard`} replace />;
    }
    
    // If all checks pass, render the component
    return children;
};

export default PrivateRoute;