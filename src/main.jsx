import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Student from "./student.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/students/:id",
    element: <Student />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalStyles styles={{ body: { backgroundColor: "#f1f1f1" } }} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
