import React from 'react';
import { FaGithub } from "react-icons/fa"
import { Link } from "react-router-dom";
import ReposItem from "./ReposItem";

function GithubRepos({ githubusername, repos = [] }) {

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <FaGithub /> Github Repos ({githubusername})
            </h2>
            {repos.map((item, index) => {
                return <ReposItem key={index} project={item} index={index + 1} />
            })}
        </div>
    )
}

export default GithubRepos;
