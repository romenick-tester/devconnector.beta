import React from 'react';
import { BiGitRepoForked } from "react-icons/bi";
import { FaEye, FaStar } from "react-icons/fa";

const ReposItem = ({ project, index }) => {
    const [show, setShow] = React.useState(false);
    const { html_url: url, name, forks_count, watchers_count, stargazers_count, description } = project;

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
            <div onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)}>
                <ul>
                    <li className="badge badge-primary">
                        <FaStar />{show && "stars"} | {stargazers_count}
                    </li>
                    <li className="badge badge-dark">
                        <FaEye />{show && "watchers"} | {watchers_count}
                    </li>
                    <li className="badge badge-light">
                        <BiGitRepoForked />{show && "forks"} | {forks_count}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ReposItem;
