import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import {AUTH_ROUTE, HOME_ROUTE} from "./utils/const.ts";
import HomePage from "./pages/HomePage/HomePage.tsx";

export const publicRoutes = [
    {
        path: AUTH_ROUTE,
        Component: AuthPage
    }
]

export const authRoutes = [
    {
        path: HOME_ROUTE,
        Component: HomePage
    }
]