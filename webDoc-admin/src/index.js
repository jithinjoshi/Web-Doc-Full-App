import React from "react";
import './index.css'
import ReactDOM from "react-dom";
import {RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <RouterProvider router={router}/>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);