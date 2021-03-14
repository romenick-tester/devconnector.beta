import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserRepos } from "../../manager";
import { FaGithub } from "react-icons/fa";
import ReposItem from "./ReposItem";

function GithubRepos({ githubusername }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (githubusername) {
            dispatch(getUserRepos(githubusername))
        }
    }, [githubusername, dispatch])

    const {
        repos_loadingL: loading,
        repos_error: error,
        github_repos: repos
    } = useSelector(state => state.repos);

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>Repositories not available...</h4>
    }

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <FaGithub />{" "}
                Github Repos
                (<a href={`https://github.com/${githubusername}`} target="_blank" rel="noopener noreferrer">
                    {githubusername}
                </a>)
            </h2>
            {repos.sort((a, b) => b.size - a.size).slice(0, 3).map((item, index) => {
                return <ReposItem key={index} project={item} index={index + 1} />
            })}
        </div>
    )
}

export default GithubRepos;
