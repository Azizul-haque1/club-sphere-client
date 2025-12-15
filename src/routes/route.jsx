import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register/Register";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/Clubs/ClubDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import ViewPayments from "../pages/Dashboard/Admin/ViewPayments";
import ClubMembers from "../pages/Dashboard/Manager/ClubMembers";
import EventsManagement from "../pages/Dashboard/Manager/EventsManagement";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";
import MyClubs from "../pages/Dashboard/MyClubs";
import MyEvents from "../pages/Dashboard/Member/MyEvents";
import Payments from "../pages/Dashboard/Member/Payments";
import ErrorPage from "../components/ErrorPage";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import Events from "../pages/Events/Events";
import EventDetails from "../pages/Events/EventDetails";
import Profile from "../pages/Profile/Profile";

export const route = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'clubs',
                Component: Clubs,

            },
            {
                path: 'clubs',
                Component: Clubs,

            },

            {
                path: 'club-details/:id',
                element: <PrivateRoute>
                    <ClubDetails></ClubDetails>
                </PrivateRoute>

            },
            {
                path: 'events',
                Component: Events

            },
            {
                path: 'events/event-details/:id',
                element: <PrivateRoute>
                    <EventDetails />
                </PrivateRoute>

            },
            {
                path: 'login',
                Component: Login

            },
            {
                path: 'register',
                Component: Register

            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },
            {
                path: 'my-clubs',
                Component: MyClubs,
            },
            {
                path: 'my-events',
                Component: MyEvents,
            },
            {
                path: 'profile',
                Component: Profile,
            },
            {
                path: 'payments',
                Component: Payments,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,

            },

            // club manager route
            {
                path: 'events-management',
                element: <EventsManagement />,
            },
            {
                path: 'event-registrations',
                element: <EventRegistrations />,
            },
            {
                path: 'club-members',
                element: <ClubMembers></ClubMembers>,
            },



            // admin route
            {

                path: 'manage-user',
                element: <ManageUsers />


            },
            {

                path: 'manage-clubs',
                element: <ManageClubs />
            },
            {

                path: 'view-payments',
                element: <ViewPayments />
            },

        ]
    },

    {
        path: '*',
        Component: ErrorPage,
    }


])