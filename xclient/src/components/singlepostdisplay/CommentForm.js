import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addComment } from "../../manager";

function CommentForm({ postId }) {
    const [text, setText] = useState("");

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        dispatch(addComment(postId, { text }));
        setText("");
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={submitHandler}>
                <textarea
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default CommentForm;
