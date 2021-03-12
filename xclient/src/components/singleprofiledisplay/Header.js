import React from 'react';
import styled from "styled-components";
import Social from "./SocialLinks";

function Header({ user, social, website, company, status, location }) {

    return (
        <Wrapper className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={user.avatar}
                alt={user.name}
            />
            <h1 className="large">{user.name}</h1>
            <p className="lead">{status} at <span>{company}</span></p>
            <p> <span>{location}</span> </p>
            <Social social={{ ...social, website }} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    span {
        text-transform: capitalize;
    }
`

export default Header;
