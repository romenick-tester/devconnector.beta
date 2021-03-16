import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useSelector(state => state.auth);
    const { loading, authenticated } = auth;

    return <Route {...rest} render={
        (props) => !loading && authenticated ? <Component {...props} /> : <Redirect to="/login" />}
    />
}

export default PrivateRoute
