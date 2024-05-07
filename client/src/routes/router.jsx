import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";
import MyPost from "../pages/MyPost";
import AddPost from "../pages/AddPost";
import UserSideBar from "../layouts/UserSideBar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/login",
        element: <Login />
    }, {
        path: "/registration",
        element: <Registration />
    }, {
        path: "/profile",
        element: <UserSideBar><Profile /></UserSideBar>,
    }, {
        path: "/my-post",
        element: <UserSideBar><MyPost /></UserSideBar>
    }, {
        path: "/add-post",
        element: <UserSideBar><AddPost /></UserSideBar>
    }
])

export default router;