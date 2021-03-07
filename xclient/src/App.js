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
    CreateProfileDisplay,
    EditProfileDisplay,
    AddEducationDisplay,
    AddExperienceDisplay,
    ProfilesDisplay,
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
                    <PrivateRoute path="/create-profile" component={CreateProfileDisplay} />
                    <PrivateRoute path="/edit-profile" component={EditProfileDisplay} />
                    <PrivateRoute path="/add-education" component={AddEducationDisplay} />
                    <PrivateRoute path="/add-experience" component={AddExperienceDisplay} />
                    <Route path="/profiles" component={ProfilesDisplay} />
                    <Route path="/register" component={RegisterDisplay}/>
                    <Route path="/login" component={LoginDisplay} />
                </Switch>
            </Main>
        </Router>
    )
}

const Main = styled.section``

export default App
