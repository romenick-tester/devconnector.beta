import React, { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../manager";
import { Loader, PostItem } from "../components";

function PostsDisplay() {

    const dispatch = useDispatch();

    const allPosts = useSelector(state => state.allPosts);
    const { loading, error, posts } = allPosts;

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <h4>{error.msg}</h4>
    }

    return (
        <>
            <h1 className="large text-primary">Posts</h1>

            <p className="lead">
                <FaUser /> Welcome to the community
            </p>

            {/* PostForm */}

            <div className="posts">
                {posts && posts.map((post) => {
                    return <PostItem key={post._id} post={post} />
                })}
            </div>
        </>
    )
}

export default PostsDisplay;
