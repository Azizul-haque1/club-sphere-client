import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>

            <main></main>
            <Navbar></Navbar>
            <Outlet />
            {/* <Footer /> */}

        </div>
    );
};

export default RootLayout;