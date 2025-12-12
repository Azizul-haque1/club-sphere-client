import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link, NavLink } from 'react-router';
import Logo from './shared/Logo';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const links = <>

        <li><NavLink to="/" className='font-medium'>Home</NavLink></li>
        <li><NavLink to="/clubs" className='font-medium'>Clubs</NavLink></li>
        <li><NavLink to="/events" className='font-medium'>Events</NavLink></li>
        {
            user &&
            <>

                <li><NavLink to="/dashboard" className='font-medium'>Dashboard</NavLink></li>
            </>
        }
    </>

    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res.user);
            }
            )
            .catch(error => console.log(error))
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-md rounded-lg p-3">
                <div className="navbar-start">
                    {/* Mobile Menu Icon */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-2 w-52 p-2 shadow-lg">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {links}
                    </ul>
                </div>
                {/* User Profile / Avatar Section */}
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        referrerPolicy='no-referrer'
                                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-2">
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                                <li>
                                    <button onClick={handleLogOut} className="w-full text-left">Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (


                        <>

                            <Link to="/register" className="btn btn-secondary btn-outline">Register</Link>
                            <Link to="/login" className="btn btn-primary ml-2">Login</Link>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
