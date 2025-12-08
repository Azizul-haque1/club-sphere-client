import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../components/shared/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate state={location.pathname} replace to={'/login'}></Navigate>
    }

    return children
};

export default PrivateRoute;