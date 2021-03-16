import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
    //const { auth_loading, isAuthenticated } = useSelector(state => state.auth);

    return <Route {...rest} render={
        (props) => !auth_loading && isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
    />
}

export default PrivateRoute
