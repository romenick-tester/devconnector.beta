import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById, getUserRepos } from "../manager";

function SingleProfileDisplay({ match }) {
    const [member, setMember] = useState({});

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
        github_repos
    } = useSelector(state => state.repos);

    useEffect(() => {
        dispatch(getUserProfileById(userId))
    }, [userId, dispatch]);

    useEffect(() => {
        setMember(profile);
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
        location = "", skills = [], social = {}, status = "", user = {} } = member;
    return (
        <div>
            <h1>{user.name}</h1>

            <h4>Experiences:</h4>
            <ul>
                {experience.map((exp, index) => {
                    return <li key={index}>{exp.title}</li>
                })}
            </ul>

            <h4>Github Repositories: </h4>
            <ul>
                {repos_loading ? <h4>Loading...</h4> : repos_error && <h4>user repos not available</h4>}
                {github_repos && (
                    github_repos.map((repo) => {
                        return <li key={repo._id}> {repo.name} </li>
                    })
                )}
            </ul>

        </div>
    )
}

export default SingleProfileDisplay;
