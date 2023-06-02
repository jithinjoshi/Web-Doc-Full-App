import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import './index.css'
import { Provider } from "react-redux";
import {store} from './Redux/Store'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
