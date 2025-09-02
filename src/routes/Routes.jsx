import { createBrowserRouter } from "react-router";

import Error from "../pages/Error";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
          children:[
            {
                index: true,
                 Component:Home
            },
     
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            }
        ]
    },
    {
        path: "/*",
        element: <Error />,
    },
]);

export default router;
