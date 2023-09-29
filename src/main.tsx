import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Subject from "./pages/Subject.tsx";
import Navbar from "./Layouts/Navbar.tsx";
import Topic from "./pages/Topic.tsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { GoogleOAuthProvider } from "@react-oauth/google";

TimeAgo.addDefaultLocale(en);

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/subjects/:subjectId",
        element: <Subject />,
      },
      {
        path: "/topics/:topicId",
        element: <Topic />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="954582395472-jef8p703tskimikqcmuv1ct5dkhfu3km.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
