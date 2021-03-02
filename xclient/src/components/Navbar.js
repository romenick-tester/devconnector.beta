import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../manager";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Links = () => {
    return (
        <>
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </>
    )
}

const AuthLinks = () => {
    const dispatch = useDispatch();
    const { info } = useSelector(state => state.user);

    return (
        <>
            <h1>
                <Link to="#!"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/dashboard">{info ? info.name : "User"}</Link></li>
                <li><Link to="" onClick={() => dispatch(logout())}>Logout</Link></li>
            </ul>
        </>
    )
}

function Navbar() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    return (
        <Nav className="navbar bg-dark">
            {isAuthenticated ? <AuthLinks /> : <Links />}
        </Nav>
    )
}

const Nav = styled.nav`
    a {
        color: yellow;
    }
`

export default Navbar;
