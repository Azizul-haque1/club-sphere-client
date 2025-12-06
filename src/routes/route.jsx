import { createBrowserRouter } from "react-router";
import Login from "../pages/Auth/Login/Login";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register/Register";
import Clubs from "../pages/Clubs/Clubs";
import ClubDetails from "../pages/Clubs/ClubDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";

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
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome,
            },

        ]
    }


])