import React from 'react';
import { useDispatch } from "react-redux";
import { likePost } from "../../manager";
import PostsItem from "./PostsItem";

function Posts({ posts }) {
    const dispatch = useDispatch();

    function likeHandler(id) {
        dispatch(likePost(id))
    }

    return (
        <div className="posts">
            {posts.map((post) => {
                return <PostsItem key={post._id} post={post} likeHandler={likeHandler} />
            })}
        </div>
    )
}

export default Posts;
