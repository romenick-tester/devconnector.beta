import React from "react";
//import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    RiUserFill,
    RiProfileFill,
    RiBaseStationFill,
    RiLoginBoxFill,
    RiLogoutBoxRFill,
    RiMessageFill
} from "react-icons/ri";

function Navbar() {
    const isAuthenticated = false;

    return (
        <Nav className="navbar bg-dark">
            {isAuthenticated ? <PrivateLinks /> : <PublicLinks />}
        </Nav>
    )
}

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
    //const dispatch = useDispatch();

    return (
        <>
            <h1>
                <Link to="#!"><RiBaseStationFill /> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles"><RiProfileFill /> Developers</Link></li>
                <li><Link to="/posts"><RiMessageFill /> Posts</Link></li>
                <li><Link to="/dashboard"><RiUserFill /> Dashboard </Link></li>
                <li><Link to="" onClick={() => console.log("logout")} ><RiLogoutBoxRFill /> Logout</Link></li>
            </ul>
        </>
    )
}

const Nav = styled.nav`
    a {
        color: yellow;
    }
`

export default Navbar;
