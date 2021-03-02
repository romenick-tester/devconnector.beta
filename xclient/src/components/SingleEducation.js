import React from 'react';

function SingleEducation({ _id, school, level, from, to, fieldofstudy, current, removeEdu }) {
    return (
        <tr>
            <td>{school}</td>
            <td className="hide-sm">
                <small>{level}</small><br />
                {fieldofstudy}
            </td>
            <td className="hide-sm">
                {from.substring(0, 4)} - {current ? "now" : to.substring(0, 4)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => removeEdu(_id)} >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default SingleEducation;
