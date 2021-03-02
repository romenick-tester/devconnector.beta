import React, { useState } from 'react';
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

    return (
        <table class="table" style={{ minWidth: "700px" }}>
            <thead>
                <tr>
                    <td colSpan={4}>
                        <h2 class="my-2">Education</h2>
                    </td>
                </tr>
                <tr>
                    <th>School</th>
                    <th class="hide-sm">Level</th>
                    <th class="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {educations.map((item) => {
                    return <SingleEducation key={item._id} {...item} removeEdu={removeEdu} />
                })}
                <tr>
                    <td>Westminster College</td>
                    <td class="hide-sm">
                        <small>BTEC</small><br />
                        Product Engineer
                    </td>
                    <td class="hide-sm">
                        2008 - 2018
                    </td>
                    <td>
                        <button class="btn btn-danger" >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProfileEducation;
