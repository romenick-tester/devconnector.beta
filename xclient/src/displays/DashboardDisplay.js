import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileEducation, ProfileExperience } from "../components";

function DashboardDisplay() {
    const user = useSelector(state => state.user);
    const { info } = user;

    const single_profile = useSelector(state => state.user_profile);
    const {
        single_profile_loading: loading,
        single_profile_error: error,
        single_profile: details,
    } = single_profile;

    if (loading) {
        return (
            <>
                <h1 className="large text-primary">
                    Loading...
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>
                <Link to="/create-profile" className="btn">Create Profile</Link>
            </>
        )
    }

    if (error) {
        return (
            <>
                <h1 className="large text-primary">
                    Error...
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>
                <Link to="/create-profile" className="btn">Create Profile</Link>
            </>
        )
    }

    return (
        <>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>

            <div className="dash-buttons">
                <Link to="/create-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-primary"></i>
                    {!details ? "Create Profile" : "Edit Profile"}
                </Link>

                <Link to="/add-experience" className="btn btn-light">
                    <i className="fab fa-black-tie text-primary"></i> Add Experience
                </Link>

                <Link to="/add-education" className="btn btn-light">
                    <i className="fas fa-graduation-cap text-primary"></i> Add Education
                </Link>
            </div>

            {details && (
                <>
                    <ProfileEducation />
                    <ProfileExperience />
                </>
            )}

        </>
    )
}

export default DashboardDisplay;
