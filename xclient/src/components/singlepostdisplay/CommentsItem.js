import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CommentsItem({ comment }) {
    const auth = useSelector(state => state.auth);
    const { user: subject } = auth;

    const { _id, name, avatar, text, date, user } = comment;

    return (
        <div className="post comment bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${_id}`}>
                    <img
                        className="round-img"
                        src={avatar}
                        alt={name}
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on {date}
                </p>
            </div>
            <div>
                {subject && subject._id === user && (
                    <button type="button" className="btn btn-danger">
                        Delete
                </button>
                )}
            </div>
        </div>
    )
}

export default CommentsItem;
