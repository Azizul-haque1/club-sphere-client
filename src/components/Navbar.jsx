import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, NavLink, useLocation } from 'react-router';
import Logo from './shared/Logo';
import useRole from '../hooks/useRole';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role } = useRole();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // console.log("Logged out successfully");
            })
            .catch(error => console.log(error));
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/clubs', label: 'Clubs' },
        { path: '/events', label: 'Events' },
    ];

    if (user) {
        navLinks.push({ path: '/dashboard', label: 'Dashboard' });
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-base-100/80 backdrop-blur-md shadow-lg py-2 border-b border-base-200'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 z-50">
                        <Logo />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-base-content/80'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="desktop-navbar-active"
                                                className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop Right Section (User/Auth) */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex items-center gap-3 p-1 pr-4 rounded-full border border-base-200 hover:bg-base-200/50 transition-all bg-base-100/50 backdrop-blur-sm group"
                                >
                                    <div className="avatar">
                                        <div className="w-9 h-9 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2 overflow-hidden">
                                            <img
                                                referrerPolicy='no-referrer'
                                                src={user.photoURL || "https://i.pravatar.cc/100"}
                                                alt="Profile"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start mr-1">
                                        <span className="text-xs font-bold text-base-content/90 leading-none mb-0.5 max-w-[100px] truncate">
                                            {user.displayName?.split(' ')[0]}
                                        </span>
                                        <span className="text-[10px] uppercase font-semibold text-primary tracking-wider leading-none">
                                            {role || 'Member'}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className="text-base-content/50 group-hover:text-primary transition-colors" />
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200">
                                    <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                                        <span className="text-xs font-semibold opacity-50">My Account</span>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/profile" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-base-200 active:bg-base-300">
                                            <User size={16} />
                                            <span>Profile</span>
                                        </Link>
                                    </li>
                                    {role === 'admin' && (
                                        <li>
                                            <Link to="/dashboard" className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-base-200 active:bg-base-300">
                                                <LayoutDashboard size={16} />
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                    )}
                                    <div className="h-px bg-base-200 my-1 mx-2"></div>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="flex items-center gap-3 py-3 px-4 rounded-xl text-error hover:bg-error/10 hover:text-error active:bg-error/20"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="btn btn-ghost btn-sm rounded-full px-5 font-normal hover:bg-base-200/50">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="btn btn-primary btn-sm rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden z-50">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="btn btn-circle btn-ghost"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-base-100 border-b border-base-200 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <div className="h-px bg-base-200 my-4"></div>

                            {user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 px-4 py-2">
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full">
                                                <img src={user.photoURL || "https://i.pravatar.cc/100"} alt="Profile" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user.displayName}</p>
                                            <p className="text-xs text-base-content/60 capitalize">{role || 'Member'}</p>
                                        </div>
                                    </div>
                                    <Link to="/dashboard/profile" className="block px-4 py-3 rounded-xl text-base-content/70 hover:bg-base-200">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogOut}
                                        className="w-full text-left px-4 py-3 rounded-xl text-error hover:bg-error/10"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                                    <Link to="/login" className="btn btn-outline rounded-xl">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn btn-primary rounded-xl">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
