import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-primary/3'>

            <Navbar></Navbar>
            <main>


            </main>
            <Outlet />
            {/* <Footer /> */}

        </div>
    );
};

export default RootLayout;