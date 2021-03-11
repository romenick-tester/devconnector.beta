import React from 'react';
import { BiGitRepoForked } from "react-icons/bi";
import { FaEye, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function ReposItem({ project, index }) {
    const { html_url: url, name, forks, watchers, stargazers_count } = project;

    console.log(project);
    return (
        <div className="repo bg-white p-1 my-1">
            <div>
                <h4><Link to={url} target="_blank"
                    rel="noopener noreferrer">Repo {index}: {name}</Link></h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat, laborum!
                </p>
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
