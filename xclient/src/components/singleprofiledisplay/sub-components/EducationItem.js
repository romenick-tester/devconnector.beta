import React, { useState } from 'react';
import styled from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function EducationItem({ edu }) {
    const [show, setShow] = useState(true);

    const { school, level, fieldofstudy, from, to, description, current } = edu;

    return (
        <div>
            <h3>
                {school}
                <Button type="button" className="text-primary" onClick={() => setShow(!show)}>
                    {show ? <BiChevronUp /> : <BiChevronDown />}
                </Button>
            </h3>

            {show && (
                <>
                    <p>{from.substring(0, 4)} - {current ? "current" : to.substring(0, 4)}</p>
                    <p><strong>Degree/Level: </strong>{level}</p>
                    <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
                    <p><strong>Description: </strong> {description} </p>
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

export default EducationItem
