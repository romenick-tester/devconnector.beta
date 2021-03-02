import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

function DashboardDisplay() {
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const { info } = user;

    return (
        <>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>
            <div className="dash-buttons">

                <Link to="/create-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i> Create Profile
                </Link>

                <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"></i> Add Experience
                </Link>

                <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"></i> Add Education
                </Link>

            </div>
        </>
    )
}

export default DashboardDisplay;
