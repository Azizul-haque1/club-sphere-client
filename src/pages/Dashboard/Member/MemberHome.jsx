
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MemberHome = () => {

    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        axiosSecure('/usesr/test')
            .then(res => {
                console.log(res.data);
            })
    }, [axiosSecure])
    return (
        <div>
            MemberHome
        </div>
    );
};

export default MemberHome;