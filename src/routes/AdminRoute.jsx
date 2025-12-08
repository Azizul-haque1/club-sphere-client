import React from 'react';
import useAuth from '../hooks/useAuth';
import Loader from '../components/shared/Loader';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useAuth()

    if (loading || roleLoading) {
        return <Loader />
    }

    if (role !== 'admin') {
        return <h1>Forbidden Access</h1>
    }


    return children
};

export default AdminRoute;