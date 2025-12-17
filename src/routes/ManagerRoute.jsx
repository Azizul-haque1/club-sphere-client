import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ForbiddenAccessPage from '../components/ForbiddenAccessPage';

const ManagerRoute = ({ children }) => {
    const { loading } = useAuth()
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loader />
    }

    if (role !== 'manager') {
        return <ForbiddenAccessPage />
    }


    return children
};

export default ManagerRoute;