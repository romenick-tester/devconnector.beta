import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useDispatch, useSelector } from "react-redux";
import { About, Edu, Exp, Repos, Header } from "../components";

function SingleProfileDisplay({ match }) {
    const loading = false;
    const error = false;
    const profile = {};

    const userId = match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(getUserProfileById(userId))
    }, [userId, dispatch]);

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>Error...</h4>
    }

    const {
        bio = "", company = "", education = [], experience = [], githubusername = "",
        location = "", skills = [], social = {}, website = "", status = "", user = {} } = profile;
    
    const header = { status, company, location };

    return (
        <>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

            <div className="profile-grid my-1">
                <Header {...header} user={user} social={social} website={website} />

                <About skills={skills} bio={bio} user={user} />

                <Exp experience={experience} />

                <Edu education={education} />

                <Repos githubusername={githubusername} />

            </div>
        </>
    )
}

export default SingleProfileDisplay;
