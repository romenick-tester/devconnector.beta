import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
    return (
        <Nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </Nav>
    )
}

const Nav = styled.nav`
    a {
        color: yellow;
    }
`

export default Navbar;
