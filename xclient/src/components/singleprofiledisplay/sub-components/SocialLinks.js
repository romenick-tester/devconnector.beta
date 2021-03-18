import React from 'react';
import styled from "styled-components";
import {
    FaGlobe, FaTwitter, FaFacebook,
    FaLinkedin, FaYoutube, FaInstagram
} from "react-icons/fa";

function SocialLinks({ social }) {
    const { website, facebook, instagram, linkedin, twitter, youtube } = social;

    return (
        <Wrapper className="icons my-1">

            {website ? (
                <a href={website} target="_blank" rel="noopener noreferrer" >
                    <FaGlobe className="icon" />
                </a>
            ) : <FaGlobe className="icon inactive" />}

            {twitter ? (
                <a href={twitter} target="_blank" rel="noopener noreferrer" >
                    <FaTwitter className="icon" />
                </a>
            ) : <FaTwitter className="icon inactive" />}

            {facebook ? (
                <a href={facebook} target="_blank" rel="noopener noreferrer" >
                    <FaFacebook className="icon" />
                </a>
            ) : <FaFacebook className="icon inactive" />}

            {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" >
                    <FaLinkedin className="icon" />
                </a>
            ) : <FaLinkedin className="icon inactive" />}

            {youtube ? (
                <a href={youtube} target="_blank" rel="noopener noreferrer" >
                    <FaYoutube className="icon" />
                </a>
            ) : <FaYoutube className="icon inactive" />}

            {instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" >
                    <FaInstagram className="icon" />
                </a>
            ) : <FaInstagram className="icon inactive" />}

        </Wrapper>
    )
}

const Wrapper = styled.div`
    .icon {
        font-size: 2rem;
        margin: 0 1rem;
    }

    .icon.inactive {
        opacity: 0.5;
    }
`

export default SocialLinks;
