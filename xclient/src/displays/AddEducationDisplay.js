import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addProfileEducation } from "../manager";

function AddEducationDisplay() {
    const [form, setForm] = useState({
        school: "",
        level: "",
        fieldofstudy: "",
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

export default AddEducationDisplay;