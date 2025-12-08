import React from 'react';
import useRole from '../../hooks/useRole';
import Loader from '../../components/shared/Loader';
import AdminHome from './Admin/AdminHome';
import ManagerHome from './Manager/ManagerHome';
import MemberHome from './Member/MemberHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole()

    if (roleLoading) {
        return <Loader />
    }

    if (role === 'admin')
        return <AdminHome />
    else if (role === 'manager') {
        return <ManagerHome />
    }
    else {
        return <MemberHome />
    }




};

export default DashboardHome;