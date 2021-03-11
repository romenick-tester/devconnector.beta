import React from 'react';
import Social from "./SocialLinks";

function ProfileHeader({ user, social }) {

    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={user.avatar}
                alt={user.name}
            />
            <h1 className="large">{user.name}</h1>
            <p className="lead">Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <Social social={social} />
        </div>
    )
}

export default ProfileHeader;
