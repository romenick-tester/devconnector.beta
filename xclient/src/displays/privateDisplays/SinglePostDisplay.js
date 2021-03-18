import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../manager";
import { Loader, Post, PostForm as Form, PostComments as Comments } from "../../components";

function SinglePostDisplay({ location }) {
    const postId = location.search && location.search.split("=")[1];

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const { loading, error, singlePost: post } = posts;

    useEffect(() => {
        dispatch(getPostById(postId));
    }, [dispatch, postId])

    const { likes, comments, ...rest } = post ? post : {};

    return (
        <div>
            <Link to="/posts" className="btn">Back To Posts</Link>

            {loading ? <Loader /> : error && <h1>{error}</h1>}

            {post && <Post {...rest} />}

            <Form />

            {comments && comments.length > 0 && (
                <Comments comment={comments} />
            )}
        </div>
    )
}

export default SinglePostDisplay;
