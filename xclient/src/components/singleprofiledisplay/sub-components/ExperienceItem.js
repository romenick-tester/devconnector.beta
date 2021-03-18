import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function ExperienceItem({ exp }) {
    const [show, setShow] = useState(true);

    const { company, title, location, from, current, to, description } = exp;

    return (
        <div>
            <h3 className="text-dark">
                {company} in {location}
                <Link to="#!" onClick={() => setShow(!show)}>
                    {show ? <BiChevronUp /> : <BiChevronDown />}
                </Link>
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

export default ExperienceItem;
