import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Alert, Navbar, } from "./components"
import {
    LandingDisplay,
    RegisterDisplay,
    LoginDisplay,
    Error404Display,
    DashboardDisplay,
} from "./displays"
import { loadUser, logout } from "./manager";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { token } = auth;

    useEffect(() => {
        if (token) {
            dispatch(loadUser())
        } else {
            dispatch(logout());
        }
    }, [token, dispatch])

    return (
        <Router>
            <Navbar/>
            
            <Route path="/" exact component={LandingDisplay}/>
                
            <Main className="container">
                <Alert />
                <Switch>
                    <Route path="/dashboard" component={DashboardDisplay} />
                    <Route path="/register" component={RegisterDisplay}/>
                    <Route path="/login" component={LoginDisplay}/>
                    <Route path="*" component={Error404Display} />
                </Switch>
            </Main>
        </Router>
    )
}

const Main = styled.section``

export default App
