import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../manager";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    RiUserFill,
    RiProfileFill,
    RiLoginBoxFill,
    RiLogoutBoxRFill,
    RiMessageFill
} from "react-icons/ri";

function Navbar() {
    const auth = useSelector(state => state.auth);
    const { loading, authenticated, user } = auth;

    return (
        <Nav className="navbar bg-dark">
            {!loading && authenticated ? <PrivateLinks user={user} /> : <PublicLinks />}
        </Nav>
    )
}

const PublicLinks = () => {
    return (
        <>
            <h1>
                <Link to="/">DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles"><RiProfileFill /> Developers</Link></li>
                <li><Link to="/login"><RiLoginBoxFill /> Login</Link></li>
            </ul>
        </>
    )
}

const PrivateLinks = ({ user }) => {
    const dispatch = useDispatch();

    return (
        <>
            <h1>
                <Link to="#!">DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/profiles"><RiProfileFill /> Developers</Link></li>
                <li><Link to="/posts"><RiMessageFill /> Posts</Link></li>
                <li><Link to="/dashboard"><RiUserFill /> {user && user.name} </Link></li>
                <li><Link to="" onClick={() => dispatch(logout())}><RiLogoutBoxRFill /> Logout</Link></li>
            </ul>
        </>
    )
}

const Nav = styled.nav`

`

export default Navbar;
