import React from 'react';
import Comment from "./CommentsItem";

function PostComments({ comments, postId }) {
    return (
        <div className="comments">
            {comments && comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} postId={postId} />
            })}
        </div>
    )
}

export default PostComments;
