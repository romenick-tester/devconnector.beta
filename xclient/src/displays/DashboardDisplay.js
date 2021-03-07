import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfile } from "../manager";
import { ProfileEducation, ProfileExperience } from "../components";

function DashboardDisplay({ history }) {
    const user = useSelector(state => state.user);
    const { info } = user;

    const single_profile = useSelector(state => state.user_profile);
    const {
        single_profile_loading: loading,
        single_profile_error: error,
        single_profile: details,
    } = single_profile;

    const dispatch = useDispatch();

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
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>
                <Link to="/create-profile" className="btn">Create Profile</Link>
                <small style={{ color: "orangered" }}>NO PROFILE SET</small>
            </>
        )
    }

    function deleteAccount() {
        const isConfirmed = window.confirm("Are you sure you want to delete your account?");

        if (isConfirmed) {
            setTimeout(async () => {
                const isForSure = window.confirm("Final check ?");

                if (isForSure) {
                    dispatch(deleteProfile());
                }
            }, 1500);

        }
    }

    return (
        <>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {info ? info.name : "to DevConnector"} !</p>

            <div className="dash-buttons">
                {!details ? (
                    <Link to="/create-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-primary"></i>
                        Create Profile
                    </Link>
                ) : (
                    <Link to="/edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-primary"></i>
                            Edit Profile
                    </Link>
                )}

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

                    <div class="my-2" onClick={() => deleteAccount()}>
                        <button class="btn btn-danger">
                            <i class="fas fa-user-minus"></i>

                        Delete My Account
                    </button>
                    </div>
                </>
            )}

        </>
    )
}

export default DashboardDisplay;
