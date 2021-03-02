import React from "react";
import { useSelector } from "react-redux";

function Alert() {
    const alerts = useSelector(state => state.alerts)

    return (
        <>
            {alerts.map((alert) => {
                const { id, type, msg } = alert;
                return (
                    <div key={id} className={`alert alert-${type}`}>
                        {msg}
                    </div>
                )
            })}
        </>
    )
}

export default Alert;

