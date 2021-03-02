import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
    const auth = useSelector(state => state.auth);
    const { auth_loading: loading, isAuthenticated } = auth;

    const AuthLinks = () => {
        return (
            <>
                <h1>
                    <Link to="!#"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                <ul>
                    <li><Link to="/profiles">Developers</Link></li>
                    <li><Link to="/dashboard">User</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </>
        )
    }

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

    return (
        <Nav className="navbar bg-dark">
            {!loading && isAuthenticated ? <AuthLinks /> : <Links />}
        </Nav>
    )
}

const Nav = styled.nav`
    a {
        color: yellow;
    }
`

export default Navbar;
