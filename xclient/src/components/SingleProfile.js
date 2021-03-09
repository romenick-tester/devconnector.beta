import React, { useState } from 'react';
import { Link } from "react-router-dom";

function SingleProfile(props) {
    const [member, setMember] = useState(props);

    return (
        <div>
            <h4><Link to={`/profile/${member.user._id}`}>{member.user.name}</Link></h4>
        </div>
    )
}

export default SingleProfile;
