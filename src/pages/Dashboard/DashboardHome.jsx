import React from 'react';
import useRole from '../../hooks/useRole';
import Loader from '../../components/shared/Loader';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()

    if (roleLoading) {
        return <Loader />
    }

    if (role === 'admin')
        return 'admin'
    else if(role ==='manager'){
        return 'menager'
    }
    else if(role ==='member'){
        return 'member'
    }
    


 
};

export default DashboardHome;