import React from 'react'

function SinglePostDisplay({ location }) {
    const postId = location.search && location.search.split("=")[1];

    console.log(postId);

    return (
        <div>
            <h3>single post display component</h3>
        </div>
    )
}

export default SinglePostDisplay;
