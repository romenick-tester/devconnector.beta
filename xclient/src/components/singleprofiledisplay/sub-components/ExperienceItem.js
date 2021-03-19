import React, { useState } from 'react';
import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function ExperienceItem({ exp }) {
    const [show, setShow] = useState(true);

    const { company, title, location, from, current, to, description } = exp;

    return (
        <div>
            <h3 className="text-dark">
                {company} in {location}
                <Button type="button" className="text-primary" onClick={() => setShow(!show)}>
                    {show ? <BiChevronUp /> : <BiChevronDown />}
                </Button>
            </h3>

            {show && (
                <>
                    <p>{from.substring(0, 4)} - {current ? "current" : to.substring(0, 4)}</p>
                    <p><strong>Position: </strong>{title}</p>
                    <p><strong>Description: </strong>{description}</p>
                </>
            )}
        </div>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
`

export default ExperienceItem;
