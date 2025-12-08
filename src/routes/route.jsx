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
                path: 'club-details/:id',
                Component: ClubDetails,

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
    }


])