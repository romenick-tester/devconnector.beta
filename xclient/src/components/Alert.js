import React from "react";

function Alert({type, msg}) {

    return (
        <div className={`alert alert-${type}`}>
          {msg}
        </div>
    )
}

Alert.defaultProps = {
    type: "warning",
    msg: "!",
}

export default Alert;

