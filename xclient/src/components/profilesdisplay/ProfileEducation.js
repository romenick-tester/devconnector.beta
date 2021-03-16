import React from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import SingleEducation from "./SingleEducation";

function ProfileEducation() {
    const loading = false;
    const error = false;
    const education = [];

    const dispatch = useDispatch();

    if (loading) {
        return <h3>Loading...</h3>
    }

    if (error) {
        return <h3>Error...</h3>
    }

    function removeEdu(id) {
        const isConfirmed = window.confirm("You want to delete?");

        if (isConfirmed) {
            //dispatch(deleteProfileEducation(id));
        }
    }

    return (
        <>
            <h1>Education</h1>
        <Table className="table">
            <thead>
                    <tr>
                    <th>School</th>
                    <th className="hide-sm">Level</th>
                    <th className="hide-sm">Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                    {education
                    .sort((a, b) => {
                        const sortByFromDate = (Number(b.from.slice(0, 4))) - (Number(a.from.slice(0, 4)))
                        return sortByFromDate;
                    })
                    .map((item) => {
                        return <SingleEducation key={item._id} {...item} removeEdu={removeEdu} />
                    })
                    }
            </tbody>
        </Table>
        </>
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

export default ProfileEducation;
