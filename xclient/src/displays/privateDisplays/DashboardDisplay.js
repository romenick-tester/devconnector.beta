import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../manager";
import { DashboardEducation, DashboardExperience } from "../../components";

function DashboardDisplay() {
    
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const { loading, error, privateProfile } = profile;

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch, privateProfile])

    if (loading) {
        return (
            <>
                <h1 className="large text-primary">
                    Loading...
                </h1>
                <p className="lead"><i className="fas fa-user"></i> Welcome to DevConnector !</p>
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
                <p className="lead"><i className="fas fa-user"></i> {error.msg}</p>
                <Link to="/create-profile" className="btn">Create Profile</Link>
                <small style={{ color: "orangered" }}>{error}</small>
            </>
        )
    }

    // function deleteAccount() {
    //     const isConfirmed = window.confirm("Are you sure you want to delete your account?");

    //     if (isConfirmed) {
    //         setTimeout(async () => {
    //             const isForSure = window.confirm("Final check ?");

    //             if (isForSure) {
    //                 console.log("deleted!");
    //                 //dispatch(deleteProfile());
    //             }
    //         }, 1500);

    //     }
    // }

    return (
        <>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to DevConnector !</p>

            <div className="dash-buttons">
                {!profile ? (
                    <Link to="/edit-profile" className="btn btn-light">
                        {/* <i className="fas fa-user-circle text-primary"></i> */}
                            Edit Profile
                    </Link>
                ) : (
                    <Link to="/create-profile" className="btn btn-light">
                            {/* <i className="fas fa-user-circle text-primary"></i> */}
                        Create Profile
                        </Link>
                )}

                <Link to="/add-experience" className="btn btn-light">
                    {/* <i className="fab fa-black-tie text-primary"></i> */}
                    Add Experience
                </Link>

                <Link to="/add-education" className="btn btn-light">
                    {/* <i className="fas fa-graduation-cap text-primary"></i> */}
                    Add Education
                </Link>
            </div>

            {profile && (
                <>
                    <DashboardEducation />
                    <DashboardExperience />

                    <div className="my-2">
                        <button className="btn btn-danger" /* onClick={() => deleteAccount()} */>
                            <i className="fas fa-user-minus"></i>
                            Delete My Account
                        </button>
                    </div>
                </>
            )}

        </>
    )
}

export default DashboardDisplay;
