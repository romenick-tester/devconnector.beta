import React from 'react';
import { BiGitRepoForked } from "react-icons/bi";
import { FaEye, FaStar } from "react-icons/fa";

const ReposItem = ({ project, index }) => {
    const { html_url: url, name, forks, watchers, stargazers_count, description } = project;

    return (
        <div className="repo bg-white p-1 my-1">
            <div>
                <h4>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Repo {index}: {name}
                    </a>
                </h4>
                <p>{description}</p>
            </div>
            <div>
                <ul>
                    <li className="badge badge-primary"><FaStar /> | {stargazers_count}</li>
                    <li className="badge badge-dark"><FaEye /> | {watchers}</li>
                    <li className="badge badge-light"><BiGitRepoForked /> | {forks}</li>
                </ul>
            </div>
        </div>
    )
}

export default ReposItem;
