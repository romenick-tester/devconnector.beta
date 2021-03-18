import React from 'react'
import { Link } from "react-router-dom";

function CommentsItem() {

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to="profile.html">
                    <img
                        className="round-img"
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                        alt=""
                    />
                    <h4>John Doe</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                    possimus corporis sunt necessitatibus! Minus nesciunt soluta
                    suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                    dolor? Illo perferendis eveniet cum cupiditate aliquam?
                </p>
                <p className="post-date">
                    Posted on 04/16/2019
                </p>
            </div>
            <button type="button" className="btn btn-danger"    >
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}

export default CommentsItem;
