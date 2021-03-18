import React from 'react';
import { Link } from "react-router-dom";

function NotFoundDisplay({ location }) {
    const currentLocation = location.pathname;

    return (
        <div>
            <h1>"{currentLocation.slice(1).toUpperCase()}" Page Is Not Found!</h1>
            <Link to="/">HOME</Link>
        </div>
    )
}

export default NotFoundDisplay;
