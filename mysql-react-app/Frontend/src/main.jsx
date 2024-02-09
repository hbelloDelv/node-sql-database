import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import AddStudent from './AddStudent.jsx';
import UpdateStudent from './UpdateStudent.jsx';

import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <AddStudent />,
  },
  {
    path: "/edit/:studentId",
    element: <UpdateStudent />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
