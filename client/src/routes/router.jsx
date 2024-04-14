import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }, {
        path: "/login",
    }, {
        path: "/registration",
    }
])

export default router;