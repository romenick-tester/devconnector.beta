import React from 'react';
import styled from "styled-components";
import ExperienceItem from "./ExperienceItem";

function Experience({ experience }) {

    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            <Wrapper>
                {experience.map((exp) => {
                    return <ExperienceItem key={exp._id} exp={exp} />
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

export default Experience;
