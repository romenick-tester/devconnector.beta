import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../manager";
import { FaUser } from "react-icons/fa";
import { Posts, PostForm } from "../../components";

function PostsDisplay({ history }) {

    const dispatch = useDispatch();
    const list = useSelector(state => state.posts);
    const { postsList: posts } = list;

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <>
            <h1 className="large text-primary">Posts</h1>
            {posts && (
                <>
                    <p className="lead">
                        <FaUser /> Welcome to the community!
                    </p>
        
                    <PostForm history={history} />
        
                    {posts.length > 0 && (
                        <Posts posts={posts} />
                    )}
                </>
            )}

        </>
    )
}

export default PostsDisplay;
