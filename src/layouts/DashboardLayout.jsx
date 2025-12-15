import React from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import useRole from '../hooks/useRole';
import Loader from '../components/shared/Loader';
import { GrUserManager } from "react-icons/gr";
import { MdAppRegistration, MdEvent, MdGroups, MdPayment } from "react-icons/md";
import Logo from '../components/shared/Logo';
import { FaUniversity, FaUsers } from "react-icons/fa";
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const { role, roleLoading } = useRole();
    const { user } = useAuth()
    const location = useLocation();
    const currentPath = location.pathname;

    // Polished active link helper with smooth transition and scale
    const isActive = (path) =>
        currentPath === path
            ? "bg-primary text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            : "transition-all duration-300 ease-in-out hover:bg-base-300 hover:scale-105";

    if (roleLoading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                {/* Drawer content */}
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-primary/3 px-6 py-3 shadow-primary/80 rounded-r-xl flex justify-between items-center">
                        {/* Left: Drawer toggle + title */}
                        <div className="flex items-center gap-4">
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
                                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                    <path d="M9 4v16"></path>
                                    <path d="M14 10l2 2l-2 2"></path>
                                </svg>
                            </label>
                            <span className="text-2xl font-bold text-gray-800">Dashboard</span>
                        </div>

                        {/* Right: Profile & dropdown */}
                        <div className="flex items-center gap-3">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-700">{user.displayName}</p>
                                        <p className="text-xs text-gray-500">{role}</p>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                            <img src={user.photoURL || "https://i.pravatar.cc/100"} alt="Profile" />
                                        </div>
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-40 mt-2">
                                    <li><Link to='/dashboard/profile'>Profile</Link></li>
                                    <li><a href="#">Settings</a></li>
                                    <li><a href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Main content */}
                    <Outlet />
                </div>

                {/* Drawer sidebar */}
                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-primary/3 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Added flex-col gap for spacing */}
                        <ul className="menu w-full grow flex flex-col gap-3">
                            {/* Logo */}
                            <li className='mb-5'>
                                <Link to='/' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/")}`} data-tip="Homepage">
                                    <p className='text-2xl text-secondary font-bold -m-2 is-drawer-open:hidden '>C<span className='text-primary'>S</span></p>
                                    <span className="is-drawer-close:hidden"><Logo /></span>
                                </Link>
                            </li>

                            {/* Home */}
                            <li>
                                <Link to='/dashboard' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard")}`} data-tip="Dashboard Home">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    </svg>
                                    <span className="is-drawer-close:hidden">Home</span>
                                </Link>
                            </li>

                            {/* Admin Links */}
                            {role === 'admin' && <>
                                <li>
                                    <Link to='/dashboard/manage-user' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/manage-user")}`} data-tip="Manage User">
                                        <GrUserManager />
                                        <span className="is-drawer-close:hidden">Manage Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/manage-clubs' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/manage-clubs")}`} data-tip="Manage Clubs">
                                        <MdGroups />
                                        <span className="is-drawer-close:hidden">Manage Clubs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/view-payments' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/view-payments")}`} data-tip="View Payments">
                                        <MdPayment />
                                        <span className="is-drawer-close:hidden">View Payments</span>
                                    </Link>
                                </li>
                            </>}

                            {/* Manager Links */}
                            {role === 'manager' && <>
                                <li>
                                    <Link to='/dashboard/my-clubs' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/my-clubs")}`} data-tip="My Clubs">
                                        <FaUniversity size={16} />
                                        <span className="is-drawer-close:hidden">My Clubs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/club-members' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/club-members")}`} data-tip="Club Members">
                                        <FaUsers size={16} />
                                        <span className="is-drawer-close:hidden">Club Members</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/events-management' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/events-management")}`} data-tip="Events Management">
                                        <MdEvent size={16} />
                                        <span className="is-drawer-close:hidden">Events Management</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/event-registrations' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/event-registrations")}`} data-tip="Event Registrations">
                                        <MdAppRegistration size={16} />
                                        <span className="is-drawer-close:hidden">Event Registrations</span>
                                    </Link>
                                </li>
                            </>}

                            {/* Member Links */}
                            {role === 'member' && <>
                                <li>
                                    <Link to='/dashboard/my-clubs' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/my-clubs")}`} data-tip="My Clubs">
                                        <FaUniversity size={16} />
                                        <span className="is-drawer-close:hidden">My Clubs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my-events' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/my-events")}`} data-tip="My Events">
                                        <MdEvent size={16} />
                                        <span className="is-drawer-close:hidden">My Events</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/payments' className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive("/dashboard/payments")}`} data-tip="Payments">
                                        <MdPayment />
                                        <span className="is-drawer-close:hidden">Payments</span>
                                    </Link>
                                </li>
                            </>}

                            {/* Settings */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                                        <path d="M20 7h-9"></path>
                                        <path d="M14 17H5"></path>
                                        <circle cx="17" cy="17" r="3"></circle>
                                        <circle cx="7" cy="7" r="3"></circle>
                                    </svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
