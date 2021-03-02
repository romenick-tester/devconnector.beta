import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Alert, Navbar, } from "./components"
import {
    LandingDisplay,
    RegisterDisplay,
    LoginDisplay,
    DashboardDisplay,
    PrivateRoute,
} from "./displays"
import { loadUser, getUserProfile } from "./manager";

function App() {
    const dispatch = useDispatch();
    const { auth_loading, isAuthenticated, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth_loading && isAuthenticated && token) {
            dispatch(loadUser());
            dispatch(getUserProfile());
        } 
    }, [auth_loading, isAuthenticated, token, dispatch])

    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={LandingDisplay} />
            <Main className="container">
                <Alert />
                <Switch>
                    <PrivateRoute path="/dashboard" component={DashboardDisplay} />
                    <Route path="/register" component={RegisterDisplay}/>
                    <Route path="/login" component={LoginDisplay} />
                </Switch>
            </Main>
        </Router>
    )
}

const Main = styled.section``

export default App
