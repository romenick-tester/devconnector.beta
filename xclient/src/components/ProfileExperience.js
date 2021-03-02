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
        <table className="table" style={{ minWidth: "700px" }}>
            <thead>
                <tr>
                    <td colSpan={4}>
                        <h2 className="my-2">Experience</h2>
                    </td>
                </tr>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {experiences.map((item) => {
                    return <SingleExperience key={item._id} {...item} removeExp={removeExp} />
                })}
                <tr>
                    <td>Traversy Media</td>
                    <td className="hide-sm">Instructor & Developer</td>
                    <td className="hide-sm">
                        02-03-2015 - Now
                    </td>
                    <td>
                        <button className="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProfileExperience;
