import React from 'react'
import { FaCheck } from "react-icons/fa";

function Skills({ skills }) {
    return (
        <>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills.map((skill, index) => <div className="p-1" key={index}><FaCheck /> {skill}</div>)}
            </div>
        </>
    )
}

export default Skills;
