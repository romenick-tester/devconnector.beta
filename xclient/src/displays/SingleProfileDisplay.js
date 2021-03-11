import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById, getUserRepos } from "../manager";
import { About, Edu, Exp, Repos, Header } from "../components";

function SingleProfileDisplay({ match }) {
    const userId = match.params.id;

    const dispatch = useDispatch();
    const {
        profile_byId_loading: loading,
        profile_byId_error: error,
        profile_byId: profile
    } = useSelector(state => state.user_byId);

    const {
        repos_loading,
        repos_error,
        github_repos: repos
    } = useSelector(state => state.repos);

    useEffect(() => {
        dispatch(getUserProfileById(userId))
    }, [userId, dispatch]);

    useEffect(() => {
        if (profile.githubusername) {
            dispatch(getUserRepos(profile.githubusername));
        }
    }, [profile, dispatch]);

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>Error...</h4>
    }

    const {
        bio = "", company = "", education = [], experience = [], githubusername = "",
        location = "", skills = [], social = {}, status = "", user = {} } = profile;

    return (
        <>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {}
            <div className="profile-grid my-1">
                <Header user={user} />

                <About skills={skills} bio={bio} user={user} />

                <Exp experience={experience} />

                <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    <div>
                        <h3>University Of Washington</h3>
                        <p>Sep 1993 - June 1999</p>
                        <p><strong>Degree: </strong>Masters</p>
                        <p><strong>Field Of Study: </strong>Computer Science</p>
                        <p>
                            <strong>Description: </strong>Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
                            ipsam, sapiente suscipit dicta eius velit amet aspernatur
                            asperiores modi quidem expedita fugit.
                        </p>
                    </div>
                </div>

                <div className="profile-github">
                    <h2 className="text-primary my-1">
                        <i className="fab fa-github"></i> Github Repos
                    </h2>
                    <div className="repo bg-white p-1 my-1">
                        <div>
                            <h4><Link to="#" target="_blank"
                                rel="noopener noreferrer">Repo One</Link></h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Repellat, laborum!
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: 44</li>
                                <li className="badge badge-dark">Watchers: 21</li>
                                <li className="badge badge-light">Forks: 25</li>
                            </ul>
                        </div>
                    </div>
                    <div className="repo bg-white p-1 my-1">
                        <div>
                            <h4><Link to="#" target="_blank"
                                rel="noopener noreferrer">Repo Two</Link></h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Repellat, laborum!
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: 44</li>
                                <li className="badge badge-dark">Watchers: 21</li>
                                <li className="badge badge-light">Forks: 25</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProfileDisplay;
