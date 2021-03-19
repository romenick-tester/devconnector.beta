import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../../manager";
import { Post, CommentForm as Form, PostComments as Comments } from "../../components";

function SinglePostDisplay({ location }) {
    const postId = location.search && location.search.split("=")[1];

    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const { singlePost: post } = posts;

    useEffect(() => {
        dispatch(getPostById(postId));
    }, [dispatch, postId])

    const { likes, comments, ...rest } = post ? post : {};

    return (
        <div>
            <Link to="/posts" className="btn">Back To Posts</Link>

            {post && <Post {...rest} />}

            <Form postId={rest._id} />

            {comments && comments.length > 0 && (
                <Comments comments={comments} postId={rest._id} />
            )}
        </div>
    )
}

export default SinglePostDisplay;
