import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingDisplay, RegisterDisplay, LoginDisplay } from "./displays"
import { Alert, Navbar, } from "./components"
import { useSelector } from "react-redux";

function App() {
    const alerts = useSelector(state => state.alerts);

    return (
        <Router>
            <Navbar/>
            
            <Route path="/" exact component={LandingDisplay}/>
                
            <section className="container">
                {alerts.length > 0 && alerts.map((alert) => {
                    return <Alert key={alert.id} {...alert} />
                })}
                <Switch>
                    <Route path="/register" component={RegisterDisplay}/>
                    <Route path="/login" component={LoginDisplay}/>
                </Switch>
            </section>
        </Router>
    )
}

export default App
