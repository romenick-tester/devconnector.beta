import React from 'react';
import Comment from "./CommentsItem";

function PostComments({ comments }) {
    return (
        <div className="comments">
            {comments && comments.map((comment) => {
                return <Comment key={comment._id} comment={comment} />
            })}
        </div>
    )
}

export default PostComments;
