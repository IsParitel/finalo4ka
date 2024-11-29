import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    JOB_LIST_ROUTE,
    JOB_PAGE_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    ADD_JOB_ROUTE
} from "./utils/consts";
import ProfilePage from "./pages/Profile_page";
import Job_list from "./pages/Job_list";
import Job_Page from "./pages/Job_page";
import Auth from "./pages/Auth";
import Main_page from "./pages/Main_page";
import AddJobPage from "./pages/AddJobPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: JOB_LIST_ROUTE,
        Component: Job_list
    },
    {
        path: JOB_PAGE_ROUTE + '/:id',
        Component: Job_Page
    },
    {
        path: ADD_JOB_ROUTE,
        Component: AddJobPage
    }
]

export const publicRoutes = [
    {
        path: REGISTER_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_PAGE_ROUTE,
        Component: Main_page
    }
]