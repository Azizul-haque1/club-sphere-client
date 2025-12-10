import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdminHome = () => {

    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure('/usesr/test')
            .then(res => {
                console.log(res.data);
            })
    }, [axiosSecure])
    return (
        <div>
            AdminHome
        </div>
    );
};

export default AdminHome;