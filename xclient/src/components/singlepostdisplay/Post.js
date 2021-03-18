import React from 'react';
import { Link } from "react-router-dom";

function Post({ user, name, avatar, text }) {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt={name}
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
            </div>
        </div>
    )
}

export default Post
