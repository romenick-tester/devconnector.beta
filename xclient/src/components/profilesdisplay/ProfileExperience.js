import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfileExperience } from "../../manager";
import SingleExperience from "./SingleExperience";

function ProfileExperience() {
    const [experiences, setExperiences] = useState([]);

    const single_profile = useSelector(state => state.user_profile);
    const {
        single_profile_loading: loading,
        single_profile_error: error,
        single_profile: details,
    } = single_profile;

    const dispatch = useDispatch();

    useEffect(() => {
        if (details) {
            setExperiences(details.experience);
        }
    }, [details])

    if (loading) {
        return <h3>loading...</h3>
    }

    if (error) {
        return <h3>error...</h3>
    }

    function removeExp(id) {
        const isConfirmed = window.confirm("You want to delete ?");

        if (isConfirmed) {
            dispatch(deleteProfileExperience(id));
        }
    }

    return (
        <Table className="table">
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
                {experiences
                    .sort((a, b) => {
                        const sortByFromDate = (Number(b.from.slice(0, 4))) - (Number(a.from.slice(0, 4)))
                        return sortByFromDate;
                    })
                    .map((item) => {
                        return <SingleExperience key={item._id} {...item} removeExp={removeExp} />
                    })
                }
                {experiences.length === 0 && (
                    <tr>
                        <td><span>sample</span> Traversy Media</td>
                        <td className="hide-sm"><span>sample</span>Instructor & Developer</td>
                        <td className="hide-sm">
                            <span>sample</span>02-03-2015 - Now
                        </td>
                        <td>
                            <button className="btn btn-danger">
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
    min-width: 800px;

    span {
        color: grey;
        font-size: 0.6rem;
        display: block;
    }
`

export default ProfileExperience;
