import React from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import SingleExperience from "./SingleExperience";

function ProfileExperience() {
    const loading = false;
    const error = false;
    const experience = [];

    const dispatch = useDispatch();

    if (loading) {
        return <h3>loading...</h3>
    }

    if (error) {
        return <h3>error...</h3>
    }

    function removeExp(id) {
        const isConfirmed = window.confirm("You want to delete ?");

        if (isConfirmed) {
            //dispatch(deleteProfileExperience(id));
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
                {experience
                    .sort((a, b) => {
                        return (Number(b.from.slice(0, 4))) - (Number(a.from.slice(0, 4)))
                    })
                    .map((item) => {
                        return <SingleExperience key={item._id} {...item} removeExp={removeExp} />
                    })
                }
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
