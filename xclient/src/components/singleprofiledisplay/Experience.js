import React from 'react';
import styled from "styled-components";

function Experience({ experience }) {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experience.map((exp) => {
                const { company, title, location, from, current, to, description } = exp;

                return (
                    <Wrapper>
                        <h3 className="text-dark">{company} in {location}</h3>
                        <p>{from.substring(0, 4)} - {current ? "current" : to.substring(0, 4)}</p>
                        <p><strong>Position: </strong>{title}</p>
                        <p><strong>Description: </strong>{description}</p>
                    </Wrapper>
                )
            })}
        </div>
    )
}

const Wrapper = styled.div`
    border-bottom: 1px solid black;
`

export default Experience;
