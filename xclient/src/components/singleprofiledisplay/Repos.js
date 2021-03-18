import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRepos } from "../../manager";
import { FaGithub } from "react-icons/fa";
import ReposItem from "./sub-components/ReposItem";
import Loader from "../Loader";

function GithubRepos({ githubusername }) {

    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles);
    const { loading, error, repos } = profiles;

    useEffect(() => {
        dispatch(getRepos(githubusername));
    }, [dispatch, githubusername])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <FaGithub />{" "}
                {error ? error : "Github Repos"}
                (<a href={`https://github.com/${githubusername}`} target="_blank" rel="noopener noreferrer">
                    {githubusername}
                </a>)
            </h2>
            {repos && repos.sort((a, b) => b.size - a.size).slice(0, 3).map((item, index) => {
                return <ReposItem key={index} project={item} index={index + 1} />
            })}
        </div>
    )
}

export default GithubRepos;
