import React from 'react';
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProfilesItem({ details }) {

    const { _id = "", name = "", avatar = "" } = details.user ? details.user : {};

    const { status = "", company = "", location = "", skills = [] } = details ? details : {};

    return (
        <div className="profile bg-light">
            <img src={avatar} alt={name} className="round-img" />

            <div style={{ textTransform: "capitalize" }}>
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile?id=${_id}`} className="btn btn-primary">View Profile</Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <FaCheck /> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfilesItem;
