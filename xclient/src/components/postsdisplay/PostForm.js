import React from 'react';
import { useDispatch } from "react-redux";
import { createPost } from "../../manager";

function PostForm({ history }) {
    const [text, setText] = React.useState("");

    const dispatch = useDispatch();

    function submitHandler(e) {
        e.preventDefault();

        const newForm = {
            text,
        }

        dispatch(createPost(newForm, history));
        setText("");
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={submitHandler}>
                <textarea
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    )
}

export default PostForm;
