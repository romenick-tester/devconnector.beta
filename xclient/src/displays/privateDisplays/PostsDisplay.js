import React, { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
//import { useDispatch, useSelector } from "react-redux";
import { Loader, PostItem } from "../../components";

function PostsDisplay() {
    const loading = false;
    const error = null;
    const posts = [];

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(getAllPosts());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <h4>{error.msg}</h4>
    }

    posts._id = "";

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
