import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import ErrorPage from './pages/Error.jsx'
import Home from './pages/Home.jsx'
import Friends from './pages/Friends.jsx'
import Indiv_Shows from './pages/Indiv_Shows.jsx'
import Nav_Page from './pages/Nav_Page.jsx'
import Overview from './pages/Overview.jsx'
import Recommendations from './pages/Recommendations.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'friends',
        element: <Friends />
      },
      {
        path: 'indiv_shows',
        element: <Indiv_Shows />
      },
      {
        path: 'nav_page',
        element: <Nav_Page />
      },
      {
        path: 'overview',
        element: <Overview />
      },
      {
        path: 'recommendations',
        element: <Recommendations />
      },
    ]
  }
])




ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
