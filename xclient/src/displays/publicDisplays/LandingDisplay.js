import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LandingDisplay({ history }) {
    const auth = useSelector(state => state.auth);
    const { loading, authenticated } = auth;

    useEffect(() => {
        if (!loading && authenticated) {
            history.push("/dashboard");
        }
    }, [loading, authenticated, history]);

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
