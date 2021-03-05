import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addProfileExperience } from "../manager";

function AddExperienceDisplay() {
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: "",
        description: ""
    })

    return (
        <div>

        </div>
    )
}

export default AddExperienceDisplay
