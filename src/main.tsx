import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@/styles/globals.css';
import ErrorPage from './ErrorPage.tsx';
import Login from './pages/auth/Login.tsx';
import Profile from './pages/profile/Profile.tsx';
import NavbarWrapper from './pages/NavbarWrapper.tsx';
import Post from './pages/posts/Post.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/bcad",
    element: <NavbarWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "post",
        element: <Post />,
      },
      {
        path: ":id",
        element: <Profile />,
      },
    ]
  },
  {
    path: "auth/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
