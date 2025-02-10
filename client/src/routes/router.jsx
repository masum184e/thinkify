import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";
import MyPost from "../pages/MyPost";
import AddPost from "../pages/AddPost";
import UserSideBar from "../layouts/UserSideBar";
import TaskManager from "../pages/TaskManager";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddProduct from "../pages/AddProduct";
import AdminSideBar from "../layouts/AdminSideBar";
import NotFound from "../pages/NotFound";
import Setting from "../pages/Setting";
import Users from "../pages/dashboard/Users";
import Dashboard from "../pages/dashboard/Dashboard";
import Post from "../pages/Post";
import MyProduct from "../pages/MyProduct";
import PublicRoute from "../layouts/PublicRoute";
import Product from "../pages/Product";
import Subscription from "../pages/Subscription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/profile",
    element: (
      <UserSideBar>
        <Profile />
      </UserSideBar>
    ),
  },
  {
    path: "/my-post",
    element: (
      <UserSideBar>
        <MyPost />
      </UserSideBar>
    ),
  },
  {
    path: "/add-post",
    element: (
      <UserSideBar>
        <AddPost />
      </UserSideBar>
    ),
  },
  {
    path: "/task-management",
    element: (
      <>
        <UserSideBar>
          <DndProvider backend={HTML5Backend}>
            <TaskManager />
          </DndProvider>
        </UserSideBar>
      </>
    ),
  },
  {
    path: "/add-product",
    element: (
      <UserSideBar>
        <AddProduct />
      </UserSideBar>
    ),
  },
  {
    path: "/my-product",
    element: (
      <UserSideBar>
        <MyProduct />
      </UserSideBar>
    ),
  },
  {
    path: "/setting",
    element: (
      <UserSideBar>
        <Setting />
      </UserSideBar>
    ),
  },
  {
    path: "/posts/:postId",
    element: (
      <PublicRoute>
        <Post />
      </PublicRoute>
    ),
  },
  {
    path: "/products/:productId",
    element: (
      <PublicRoute>
        <Product />
      </PublicRoute>
    ),
  },{
path:"/subscription",
element: <PublicRoute><Subscription /></PublicRoute>
  },{
    path: "/dashboard",
    element: <AdminSideBar />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
