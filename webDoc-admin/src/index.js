import React from "react";
import './index.css'
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import App from "./App";
import store from "./redux/store";
import { Provider } from 'react-redux'
import { DarkModeContextProvider } from "./context/darkModeContext";

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} /> {/* Move RouterProvider inside Provider */}
          <App />
        </PersistGate>
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
