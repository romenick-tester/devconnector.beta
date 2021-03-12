import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    RiUserFill, RiProfileFill, RiBaseStationFill,
    RiLoginBoxFill, RiLogoutBoxRFill
} from "react-icons/ri";
import { logout } from "../manager";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PublicLinks = () => {
    return (
        <>
            <h1>
                <Link to="/"><RiBaseStationFill /> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles"><RiProfileFill /> Developers</Link></li>
                <li><Link to="/login"><RiLoginBoxFill /> Login</Link></li>
            </ul>
        </>
    )
}

const PrivateLinks = () => {
    const dispatch = useDispatch();
    const { info } = useSelector(state => state.user);

    return (
        <>
            <h1>
                <Link to="#!"><RiBaseStationFill /> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles"><RiProfileFill /> Developers</Link></li>
                <li><Link to="/dashboard"><RiUserFill /> {info ? info.name : "User"}</Link></li>
                <li><Link to="" onClick={() => dispatch(logout())}><RiLogoutBoxRFill /> Logout</Link></li>
            </ul>
        </>
    )
}

function Navbar() {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    return (
        <Nav className="navbar bg-dark">
            {isAuthenticated ? <PrivateLinks /> : <PublicLinks />}
        </Nav>
    )
}

const Nav = styled.nav`
    a {
        color: yellow;
    }
`

export default Navbar;
