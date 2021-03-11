import React from 'react';
import { Link } from "react-router-dom";
import { FaGlobe, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

function SocialLinks() {
    return (
        <div className="icons my-1">
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaGlobe />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
            </Link>
            <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </Link>
        </div>
    )
}

export default SocialLinks;
