import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Alert, Navbar, } from "./components"
import {
    LandingDisplay,
    RegisterDisplay,
    LoginDisplay,
    // DashboardDisplay,
    // PrivateRoute,
    // CreateProfileDisplay,
    // EditProfileDisplay,
    // AddEducationDisplay,
    // AddExperienceDisplay,
    // ProfilesDisplay,
    // SingleProfileDisplay,
    // PostsDisplay,
} from "./displays"

function App() {

    return (
        <Router>
            <Navbar />
            <Route path="/" exact component={LandingDisplay} />
            <Main className="container">
                <Alert />
                <Switch>
                    {/* <PrivateRoute path="/posts" component={PostsDisplay} />
                    <PrivateRoute path="/dashboard" component={DashboardDisplay} />
                    <PrivateRoute path="/create-profile" component={CreateProfileDisplay} />
                    <PrivateRoute path="/edit-profile" component={EditProfileDisplay} />
                    <PrivateRoute path="/add-education" component={AddEducationDisplay} />
                    <PrivateRoute path="/add-experience" component={AddExperienceDisplay} />
                    <Route path="/profile/:id" component={SingleProfileDisplay} />
                    <Route path="/profiles" component={ProfilesDisplay} /> */}
                    <Route path="/register" component={RegisterDisplay} />
                    <Route path="/login" component={LoginDisplay} />
                </Switch>
            </Main>
        </Router>
    )
}

const Main = styled.section``

export default App
