import React from 'react'

function Bio({ bio, user: { name = "" } }) {

    return (
        <>
            <h2 className="text-primary">{name.split(" ")[0]}'s Bio</h2>
            <p> {bio} </p>
        </>
    )
}

Bio.propsDefault = {
    bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. doloremque nesciunt, repellendus nostrum deleniti recusandae nobis neque modi perspiciatis similique?"
}

export default Bio;
