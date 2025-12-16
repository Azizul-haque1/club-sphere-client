import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>

            <Navbar></Navbar>
            <main className='min-h-screen'>

                <Outlet />

            </main>
            {/* <Footer /> */}
            <footer className='mt-10'>

                <Footer />
            </footer>

        </div>
    );
};

export default RootLayout;