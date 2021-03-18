import React from 'react';
import { useDispatch } from "react-redux";
import { likePost, unlikePost, deletePost } from "../../manager";
import PostsItem from "./PostsItem";

function Posts({ posts }) {
    const dispatch = useDispatch();

    function likeHandler(id) {
        dispatch(likePost(id))
    }

    function unlikeHandler(id) {
        dispatch(unlikePost(id))
    }

    function deleteHandler(id) {
        const confirm = window.confirm("Delete this post?");

        if (confirm) {
            dispatch(deletePost(id));
        }
    }

    return (
        <div className="posts">
            {posts.map((post) => {
                return (
                    <PostsItem
                        key={post._id}
                        post={post}
                        likeHandler={likeHandler}
                        unlikeHandler={unlikeHandler}
                        deleteHandler={deleteHandler}
                    />
                )
            })}
        </div>
    )
}

export default Posts;
