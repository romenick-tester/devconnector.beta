import React from 'react';
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../manager";
import PostsItem from "./PostsItem";

function Posts({ posts }) {
    const dispatch = useDispatch();

    function likeHandler(id) {
        dispatch(likePost(id))
    }

    function unlikeHandler(id) {
        dispatch(unlikePost(id))
    }

    return (
        <div className="posts">
            {posts.map((post) => {
                return <PostsItem key={post._id} post={post} likeHandler={likeHandler} unlikeHandler={unlikeHandler} />
            })}
        </div>
    )
}

export default Posts;
