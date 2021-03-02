import React, { useState } from 'react';
import { useSelector } from "react-redux";
import SingleExperience from "./SingleExperience";

function ProfileExperience() {
    const single_profile = useSelector(state => state.user_profile);
    const {
        single_profile_loading: loading,
        single_profile_error: error,
        single_profile: details,
    } = single_profile;

    const [experiences, setExperiences] = useState(details && details.experience ? details.experience : []);

    if (loading) {
        return <h3>loading...</h3>
    }

    if (error) {
        return <h3>error...</h3>
    }

    function removeExp(id) {
        const newExperiences = experiences.filter((item) => item._id !== id);
        setExperiences(newExperiences);
    }

    return (
        <table class="table" style={{ minWidth: "700px" }}>
            <thead>
                <tr>
                    <h2 class="my-2">Experience</h2>
                </tr>
                <tr>
                    <th>Company</th>
                    <th class="hide-sm">Title</th>
                    <th class="hide-sm">Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {experiences.map((item) => {
                    return <SingleExperience key={item._id} {...item} removeExp={removeExp} />
                })}
                <tr>
                    <td>Traversy Media</td>
                    <td class="hide-sm">Instructor & Developer</td>
                    <td class="hide-sm">
                        02-03-2015 - Now
                    </td>
                    <td>
                        <button class="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProfileExperience;
