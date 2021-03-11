import React from 'react';
import { Link } from "react-router-dom";

function ReposItem({ project, index }) {
    const { html_url, name } = project;

    return (
        <div className="repo bg-white p-1 my-1">
            <div>
                <h4><Link to={html_url} target="_blank"
                    rel="noopener noreferrer">Repo {index}: {name}</Link></h4>
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
    )
}

export default ReposItem;
