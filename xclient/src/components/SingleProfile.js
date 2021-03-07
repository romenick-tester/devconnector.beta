import React, { useState } from 'react';
import { Link } from "react-router-dom";

function SingleProfile(props) {
    const [developer, setDeveloper] = useState(props);

    return (
        <div>
            <h4><Link to={`/profile/${developer.user._id}`}>{developer.user.name}</Link></h4>
        </div>
    )
}

export default SingleProfile;
