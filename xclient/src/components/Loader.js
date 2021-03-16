import React from 'react';
import { spinner } from "../manager";

function Loader() {
    const styling = {
        style: {
            display: "block",
            width: "150px",
            height: "150px",
            margin: "auto"
        }
    }

    return <img src={spinner} alt="loading" {...styling} />
}

export default Loader
