import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaTrash } from "react-icons/fa"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostItem({ post }) {
    const { _id, text, name, avatar, user: postUser, likes, comments, date } = post;

    const user = useSelector(state => state.user);
    const { info } = user;

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to="/profile">
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
                    Posted on {date.slice(0, 10)}
                </p>
                <button type="button" className="btn btn-light">
                    <FaThumbsUp />{" "}
                    {likes.length > 0 && (
                        <span>{likes.length}</span>
                    )}
                </button>
                <button type="button" className="btn btn-light">
                    <FaThumbsDown />{" "}
                </button>
                <Link to={`/post?id=${_id}`} className="btn btn-primary">
                    Discussion {" "}
                    {comments.length > 0 && (
                        <span className='comment-count'>{comments.length}</span>
                    )}
                </Link>
                {postUser === info._id && (
                    <button type="button" className="btn btn-danger">
                        <FaTrash />
                    </button>
                )}
            </div>
        </div>
    )
}

export default PostItem;
