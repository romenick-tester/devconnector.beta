import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaUser, FaUserEdit, FaUserCircle, FaUserGraduate, FaBlackTie, FaUserMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../manager";
import { DashboardEducation, DashboardExperience } from "../../components";

function DashboardDisplay() {
    
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const { loading, error, privateProfile: profiling } = profile;

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])

    if (loading) {
        return (
            <>
                <h1 className="large text-primary">
                    Loading...
                </h1>
                <p className="lead"><FaUser /> Welcome to DevConnector !</p>
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
                <p className="lead"><FaUser /> {error.msg}</p>
                <Link to="/create-profile" className="btn">Create Profile</Link>
                <small style={{ color: "orangered" }}>{error}</small>
            </>
        )
    }

    const { education = [], experience = [], user = {} } = profiling;

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
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name} !</p>

            <div className="dash-buttons">
                {profiling ? (
                    <Link to="/edit-profile" className="btn btn-light">
                        <FaUserEdit /> Edit Profile
                    </Link>
                ) : (
                    <Link to="/create-profile" className="btn btn-light">
                            <FaUserCircle /> Create Profile
                    </Link>
                )}

                <Link to="/add-experience" className="btn btn-light">
                    <FaBlackTie /> Add Experience
                </Link>

                <Link to="/add-education" className="btn btn-light">
                    <FaUserGraduate /> Add Education
                </Link>
            </div>

            {profiling && (
                <>
                    <DashboardEducation education={education} />
                    <DashboardExperience experience={experience} />

                    <div className="my-2">
                        <button className="btn btn-danger" /* onClick={() => deleteAccount()} */>
                            <FaUserMinus /> Delete My Account
                        </button>
                    </div>
                </>
            )}

        </>
    )
}

export default DashboardDisplay;
