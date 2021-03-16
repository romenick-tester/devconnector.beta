import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LandingDisplay() {
    return (
        <Wrapper className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                      Create a developer profile/portfolio, share posts and get help from
                      other developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    h1 {
        color: yellow;
    }
`

export default LandingDisplay;