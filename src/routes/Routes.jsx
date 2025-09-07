import { createBrowserRouter } from "react-router";

import Error from "../pages/Error";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import CreateEvent from "../pages/CreateEvent";
import PrivateRoute from "../Provider/PrivateRoute";
import UpcomingEvents from "../pages/UpcomingEvents";
import EventDetails from "../pages/EventDetails";
import JoinedEvents from "../pages/JoinedEvents";
import ManageEvent from "../pages/ManageEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
   
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "events/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/events/${params.id}`),
      },
      {
        path: "joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <PrivateRoute>
            <ManageEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "upcoming-events",
        element: <UpcomingEvents />,
      },
     
    ],
    
  },
   {
        path: "*", 
        element: <Error />,
      },
]);

export default router;
