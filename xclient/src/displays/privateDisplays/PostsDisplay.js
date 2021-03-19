import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../manager";
import { FaUser } from "react-icons/fa";
import { Posts, Loader, PostForm } from "../../components";

function PostsDisplay({ history }) {

    const dispatch = useDispatch();
    const list = useSelector(state => state.posts);
    const { loading, error, postsList: posts } = list;

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h1 className="large text-primary">Posts</h1>

            <p className="lead">
                <FaUser /> {error ? error : "Welcome to the community"}
            </p>

            <PostForm history={history} />

            {posts && posts.length > 0 && (
                <Posts posts={posts} />
            )}

        </>
    )
}

export default PostsDisplay;
