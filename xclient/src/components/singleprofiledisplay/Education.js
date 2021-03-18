import React from 'react';
import styled from "styled-components";
import EduItem from "./sub-components/EducationItem";

function Education({ education }) {
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            <Wrapper>
                {education.length === 0 && <p>Education not provided</p>}
                {education.map((edu) => {
                    return <EduItem key={edu._id} edu={edu} />
                })}
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    div {
        margin-bottom: 1rem;
        border-bottom: 1px dotted #999;
    }

    div:last-child {
        border-bottom: none;
    }
`

export default Education;
