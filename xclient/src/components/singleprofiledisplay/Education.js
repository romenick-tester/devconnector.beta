import React from 'react';
import styled from "styled-components";
import EducationItem from "./EducationItem";

function Education({ education }) {
    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            <Wrapper>
                {education.map((edu) => {
                    return <EducationItem key={edu._id} edu={edu} />
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
