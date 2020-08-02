import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
// The <Provider /> makes the Redux store available to any nested components that have been wrapped in the connect() function.

import "./index.css";
import App from "./App";

import { store, persistor } from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
