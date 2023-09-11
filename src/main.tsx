import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Subject from "./pages/Subject.tsx";
import Navbar from "./Layouts/Navbar.tsx";
import Topic from "./pages/Topic.tsx";

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
