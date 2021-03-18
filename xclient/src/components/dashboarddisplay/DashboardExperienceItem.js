import React from 'react';

function SingleExperience({ title, company, location, from, current, to, _id, removeExp }) {

    return (
        <tr>
            <td>{company}</td>
            <td className="hide-sm">
                <small>{location}</small> <br />
                {title}
            </td>
            <td className="hide-sm">
                {from.substring(0, 4)} - {current ? "now" : to.substring(0, 4)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => removeExp(_id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default SingleExperience;
