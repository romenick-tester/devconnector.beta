import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppProvider, store } from "./manager"
import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <AppProvider>
            <App/>
        </AppProvider>
    </Provider>
    , document.getElementById("root")
);