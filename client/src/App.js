import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingDisplay, } from "./displays"
import { Navbar, } from "./components"

function App() {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route path="/" exact component={LandingDisplay}/>
            </Switch>
        </Router>
    )
}

export default App
