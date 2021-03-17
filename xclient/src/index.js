import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./manager"
import App from "./App";

import "./manager/miscs/globalstyling.css";

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route render={(props) => <App {...props} />} />
        </Router>
    </Provider>
    , document.getElementById("root")
);