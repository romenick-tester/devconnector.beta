import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { About, Edu, Exp, Repos, Header, Loader } from "../../components";
import { getProfileById } from '../../manager';

function SingleProfileDisplay({ match }) {
    const userId = match.params.id;

    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);
    const { loading, single: profile } = profiles;

    useEffect(() => {
        dispatch(getProfileById(userId))
    }, [userId, dispatch]);

    const {
        bio, company, education, experience, githubusername,
        location, skills, social, website, status, user
    } = profile ? profile : {};
    
    const header = { status, company, location };

    return (
        <>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {loading && <Loader />}
            {profile && (
                <div className="profile-grid my-1">
                    <Header {...header} user={user} social={social} website={website} />

                    <About skills={skills} bio={bio} user={user} />

                    <Exp experience={experience} />

                    <Edu education={education} />

                    {githubusername ? (
                        <Repos githubusername={githubusername} />
                    ) : (
                        <h4>N/A</h4>
                    )}

                </div>
            )}
        </>
    )
}

export default SingleProfileDisplay;
