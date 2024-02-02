import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App.jsx";
import "./index.css";

import Home from "./pages/Home.jsx"
import Signup from "./pages/SignupForm.jsx"
import Error from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
