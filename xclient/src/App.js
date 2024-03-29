import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Alert, Navbar, } from "./components"
import {
    LandingDisplay,
    RegisterDisplay,
    LoginDisplay,
    PrivateRoute,
    DashboardDisplay,
    CreateProfileDisplay,
    AddEducationDisplay,
    AddExperienceDisplay,
    EditProfileDisplay,
    ProfilesDisplay,
    SingleProfileDisplay,
    PostsDisplay,
    SinglePostDisplay,
    NotFoundDisplay,
} from "./displays";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./manager";
import { PROFILE_USER_ID_CLEAR } from "./manager/redux/constants/profileConstants";

function App({ location }) {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { loading, authenticated } = auth;

    useEffect(() => {
        if (!loading && authenticated) {
            dispatch(loadUser());
        }
    }, [dispatch, loading, authenticated])

    useEffect(() => {
        if (!location.search && location.search !== "?clear") {
            dispatch({ type: PROFILE_USER_ID_CLEAR });
        }
    }, [dispatch, location.search]);

    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={LandingDisplay} />
                <Main className="container">
                    <Alert />
                    <Switch>
                        <PrivateRoute path="/post" component={SinglePostDisplay} />
                        <PrivateRoute path="/posts" component={PostsDisplay} />
                        <PrivateRoute path="/edit-profile" component={EditProfileDisplay} />
                        <PrivateRoute path="/add-education" component={AddEducationDisplay} />
                        <PrivateRoute path="/add-experience" component={AddExperienceDisplay} />
                        <PrivateRoute path="/create-profile" component={CreateProfileDisplay} />
                        <PrivateRoute path="/dashboard" component={DashboardDisplay} />
                        <Route path="/profile/:id" component={SingleProfileDisplay} />
                        <Route path="/profiles" component={ProfilesDisplay} />
                        <Route path="/register" component={RegisterDisplay} />
                        <Route path="/login" component={LoginDisplay} />
                        <Route path="*" component={NotFoundDisplay} />
                    </Switch>
                </Main>
            </Switch>
        </>
    )
}

const Main = styled.section``

export default App
