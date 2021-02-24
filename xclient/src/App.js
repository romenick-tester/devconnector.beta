import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingDisplay, RegisterDisplay, LoginDisplay } from "./displays"
import { Navbar, } from "./components"

function App() {
    return (
        <Router>
            <Navbar/>
            
            <Route path="/" exact component={LandingDisplay}/>
                
            <section className="container">
                <Switch>
                    <Route path="/register" component={RegisterDisplay}/>
                    <Route path="/login" component={LoginDisplay}/>
                </Switch>
            </section>
        </Router>
    )
}

export default App
