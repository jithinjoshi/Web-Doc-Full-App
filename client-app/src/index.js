import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import './index.css'
import { Provider } from "react-redux";
import { store, persistor } from './Redux/Store'; // Import persistor
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
