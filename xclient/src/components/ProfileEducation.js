import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux";
import SingleEducation from "./SingleEducation";

function ProfileEducation() {
    const single_profile = useSelector(state => state.user_profile);
    const {
        single_profile_loading: loading,
        single_profile_error: error,
        single_profile: details,
    } = single_profile;

    const [educations, setEducations] = useState(details && details.education ? details.education : []);

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>Error...</h3>
    }

    function removeEdu(id) {
        const newEducations = educations.filter((item) => item._id !== id);
        setEducations(newEducations);
    }

    function deleteEducation() {
        const isConfirmed = window.confirm("you want to delete this?");

        if (isConfirmed) {
            console.log("deleted!");
        }
    }

    return (
        <Table className="table">
            <thead>
                <tr>
                    <td colSpan={4}>
                        <h2>Education</h2>
                    </td>
                </tr>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Level</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {educations.map((item) => {
                    return <SingleEducation key={item._id} {...item} removeEdu={removeEdu} />
                })}
                {educations.length === 0 && (
                    <tr>
                        <td><span>sample</span> Westminster College</td>
                        <td className="hide-sm">
                            <small><span>sample</span> BTEC</small><br />
                            Product Engineer
                        </td>
                        <td className="hide-sm">
                            <span>sample</span> 2008 - 2018
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteEducation()} >
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

const Table = styled.table`
    min-width: 700px;

    span {
        color: grey;
        font-size: 0.6rem;
        display: block;
    }
`

export default ProfileEducation;
